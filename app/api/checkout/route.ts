import{NextRequest,NextResponse}from'next/server'
import{createPreference}from'../../../lib/mercadopago'
import{checkoutSchema,validateInput}from'../../../lib/validation'
import{logCheckout,logSecurityEvent}from'../../../lib/logger'
import{verifyRecaptcha}from'../../../lib/recaptcha'

export async function POST(req:NextRequest){
  const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||
           req.headers.get('x-real-ip')||'unknown'
  const userAgent=req.headers.get('user-agent')||'unknown'
  
  try{
    const body=await req.json()
    
    // Validar dados de entrada
    const validation=validateInput(checkoutSchema,body)
    
    if(!validation.success){
      // Log de validação falha
      await logSecurityEvent('validation',{
        ip,
        userAgent,
        path:'/api/checkout',
        reason:'Invalid plan',
        details:validation.details
      })
      
      return NextResponse.json(
        {
          success:false,
          message:validation.error,
          ...(process.env.NODE_ENV==='development'&&{details:validation.details})
        },
        {status:400}
      )
    }
    
    const{plan,recaptchaToken}=validation.data
    
    // Verificar reCAPTCHA
    if(recaptchaToken){
      const recaptchaResult=await verifyRecaptcha(recaptchaToken,'checkout')
      
      if(!recaptchaResult.success){
        await logSecurityEvent('violation',{
          ip,
          userAgent,
          path:'/api/checkout',
          reason:'reCAPTCHA failed',
          details:[recaptchaResult.error||'Unknown error'],
          score:recaptchaResult.score
        })
        
        return NextResponse.json(
          {
            success:false,
            message:'Verificação de segurança falhou. Tente novamente.'
          },
          {status:403}
        )
      }
      
      console.log(`✅ [reCAPTCHA] Checkout verificado - Score: ${recaptchaResult.score}`)
    }
    
    // Log de checkout iniciado
    await logCheckout('started',{
      ip,
      userAgent,
      plan
    })
    
    // Criar preferência do MercadoPago
    const p=await createPreference(plan)
    
    return NextResponse.json({
      success:true,
      init_point:p.init_point
    })
    
  }catch(error){
    // Log de erro
    await logCheckout('failed',{
      ip,
      userAgent,
      error:error instanceof Error?error.message:'Unknown error'
    })
    
    console.error('❌ [ERROR] Erro ao processar checkout:',error)
    return NextResponse.json(
      {
        success:false,
        message:'Erro ao processar checkout.'
      },
      {status:500}
    )
  }
}