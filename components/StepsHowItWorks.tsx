'use client'
import {motion} from 'framer-motion'

export default function StepsHowItWorks(){
  const steps=[
    {t:'Busque',d:'Encontre imóveis filtrando por cidade e preço.'},
    {t:'Compare',d:'Analise fotos e informações completas.'},
    {t:'Fale no WhatsApp',d:'Contato direto e sem intermediários.'},
    {t:'Feche negócio',d:'Segurança e transparência.'}
  ]
  
  return(
    <motion.section 
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.6}}
      className='container py-12 md:py-16'
    >
      <h2 className='text-2xl font-bold text-[var(--petroleum)] mb-6'>
        Como funciona
      </h2>
      
      <div className='grid md:grid-cols-4 gap-4'>
        {steps.map((s,i)=>(
          <motion.div 
            key={i}
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:0.5,delay:i*0.1}}
            whileHover={{scale:1.05,y:-5}}
            className='card text-center'
          >
            <div className='badge mb-2'>Passo {i+1}</div>
            <h3 className='font-semibold'>{s.t}</h3>
            <p className='text-sm text-gray-600 mt-1'>{s.d}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
