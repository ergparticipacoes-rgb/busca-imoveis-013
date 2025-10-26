'use client'
import {motion} from 'framer-motion'
import {executeRecaptcha} from '../lib/recaptcha'
import {brl} from '../lib/utils'

export default function PlansSection(){
  async function checkout(plan:string){
    try{
      // Executar reCAPTCHA
      const recaptchaToken=await executeRecaptcha('checkout')
      
      const res=await fetch('/api/checkout',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({plan,recaptchaToken})
      })
      const j=await res.json()
      
      if(j.success&&j.init_point){
        window.location.href=j.init_point
      }else{
        alert(j.message||'Erro ao iniciar checkout')
      }
    }catch(error){
      console.error('Erro no checkout:',error)
      alert('Erro ao processar checkout. Tente novamente.')
    }
  }
  
  const plans=[
    {id:'basic',name:'Básico',price:0,perks:['1 anúncio ativo','Listagem padrão'],cta:'Começar grátis'},
    {id:'pro',name:'Pro',price:59.9,perks:['10 anúncios','Destaque rotativo','WhatsApp direto'],cta:'Assinar Pro'},
    {id:'max',name:'Max',price:129.9,perks:['50 anúncios','Relatórios e métricas'],cta:'Assinar Max'}
  ]
  
  return(
    <motion.section 
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.6}}
      className='container py-12 md:py-16'
    >
      <h2 className='text-2xl font-bold text-[var(--petroleum)] text-center'>
        Planos para vender mais
      </h2>
      
      <div className='grid md:grid-cols-3 gap-6 mt-6'>
        {plans.map((p,idx)=>(
          <motion.div 
            key={p.id}
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:0.5,delay:idx*0.1}}
            whileHover={{scale:1.05,y:-8}}
            className={`card text-center flex flex-col h-full items-stretch ${p.id!=='basic'?'ring-2 ring-[var(--gold)]/30':''}`}
          >
            <div className='flex flex-col items-center justify-center'>
              <div className='badge'>{p.name}</div>
              <div className='text-3xl font-bold mt-3 text-[var(--petroleum)]'>
                {p.price?brl(p.price):'Grátis'}
              </div>
            </div>
            <ul className='text-sm text-gray-700 mt-4 space-y-2 flex-grow'>
              {p.perks.map((x,i)=><li key={i}>• {x}</li>)}
            </ul>
            <button 
              onClick={()=>checkout(p.id)}
              className='btn btn-primary mt-4 w-full'
            >
              {p.cta}
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className='flex items-center justify-center gap-2 mt-6 text-sm text-gray-600'>
        <span className='text-green-600 text-lg'>🔒</span>
        <span>Seus dados são protegidos pela plataforma Busca Imóveis 013®.</span>
      </div>
    </motion.section>
  )
}
