'use client'
import {motion} from 'framer-motion'

export default function FAQSection(){
  const faq=[
    {q:'Como funcionam os destaques?',a:'Planos Pro e Max aparecem na seção principal e giram por algoritmo.'},
    {q:'Posso cancelar quando quiser?',a:'Sim, o cancelamento é livre e sem taxas.'},
    {q:'Como recebo os leads?',a:'Por e-mail e WhatsApp informados no cadastro.'},
    {q:'Vocês cobram comissão?',a:'Não, apenas o valor do plano escolhido.'},
    {q:'É seguro anunciar?',a:'Sim, validamos os anúncios e garantimos transparência.'}
  ]
  
  return(
    <motion.section 
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.6}}
      className='container py-12 md:py-16'
    >
      <h2 className='text-2xl font-bold text-[var(--petroleum)] mb-4'>
        Perguntas frequentes
      </h2>
      
      <div className='space-y-2'>
        {faq.map((f,i)=>(
          <motion.details 
            key={i}
            initial={{opacity:0,x:-20}}
            whileInView={{opacity:1,x:0}}
            viewport={{once:true}}
            transition={{duration:0.4,delay:i*0.05}}
            className='card hover:shadow-md transition-shadow'
          >
            <summary className='font-semibold cursor-pointer hover:text-[var(--petroleum)]'>
              {f.q}
            </summary>
            <p className='text-sm text-gray-700 mt-1'>{f.a}</p>
          </motion.details>
        ))}
      </div>
    </motion.section>
  )
}
