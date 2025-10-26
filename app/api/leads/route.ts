import {NextRequest, NextResponse} from 'next/server'
import {leadSchema, validateInput} from '../../../lib/validation'
import {logLead, logSecurityEvent} from '../../../lib/logger'
import {verifyRecaptcha} from '../../../lib/recaptcha'

/**
 * POST /api/leads
 * Recebe contatos/leads de interessados
 * Protegido contra XSS, injeções e bots via Zod validation + reCAPTCHA
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
             req.headers.get('x-real-ip') || 'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'
  
  try {
    const body = await req.json()
    
    // Validar dados de entrada
    const validation = validateInput(leadSchema, body)
    
    if (!validation.success) {
      // Log de validação falha
      await logSecurityEvent('validation', {
        ip,
        userAgent,
        path: '/api/leads',
        reason: 'Invalid input',
        details: validation.details
      })
      
      return NextResponse.json(
        {
          success: false,
          message: validation.error,
          ...(process.env.NODE_ENV === 'development' && {details: validation.details})
        },
        {status: 400}
      )
    }
    
    const lead = validation.data
    
    // Verificar reCAPTCHA
    if (lead.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(lead.recaptchaToken, 'submit_lead')
      
      if (!recaptchaResult.success) {
        await logSecurityEvent('violation', {
          ip,
          userAgent,
          path: '/api/leads',
          reason: 'reCAPTCHA failed',
          details: [recaptchaResult.error || 'Unknown error'],
          score: recaptchaResult.score
        })
        
        return NextResponse.json(
          {
            success: false,
            message: 'Verificação de segurança falhou. Tente novamente.'
          },
          {status: 403}
        )
      }
      
      console.log(`✅ [reCAPTCHA] Lead verificado - Score: ${recaptchaResult.score}`)
    }
    
    // Log do lead criado com sucesso
    await logLead('created', {
      ip,
      userAgent,
      city: lead.city,
      interest: lead.interest,
      phone: lead.phone,
      hasEmail: !!lead.email
    })
    
    // TODO: Salvar no banco de dados
    // await db.leads.create({ data: lead })
    
    // TODO: Enviar notificação (e-mail, Slack, etc)
    // await sendNotification(lead)
    
    return NextResponse.json({
      success: true,
      message: 'Lead recebido com sucesso!'
    })
    
  } catch (error) {
    // Log de erro
    await logLead('failed', {
      ip,
      userAgent,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    console.error('❌ [ERROR] Erro ao processar lead:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar solicitação.'
      },
      {status: 500}
    )
  }
}

/**
 * GET /api/leads
 * Lista leads (protegido, requer autenticação em produção)
 */
export async function GET(req: NextRequest) {
  // TODO: Implementar autenticação
  // const session = await getSession(req)
  // if (!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  
  try {
    // TODO: Buscar leads do banco de dados
    // const leads = await db.leads.findMany()
    
    // Mock data para desenvolvimento
    const leads = [
      {
        id: '1',
        name: 'João Silva',
        phone: '13999999999',
        city: 'Santos',
        interest: 'comprar',
        createdAt: new Date().toISOString()
      }
    ]
    
    return NextResponse.json({
      success: true,
      data: leads
    })
    
  } catch (error) {
    console.error('❌ [ERROR] Erro ao buscar leads:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao buscar leads.'
      },
      {status: 500}
    )
  }
}

