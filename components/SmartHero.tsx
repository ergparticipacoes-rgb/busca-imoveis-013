'use client'
import {useEffect,useState} from'react'
import {motion} from 'framer-motion'

const copies=[
{h1:'O primeiro sistema inteligente de busca e anúncios imobiliários da Baixada Santista.',p:'Busca inteligente e confiável na Baixada Santista.'},
{h1:'Imóveis verificados, sem dor de cabeça.',p:'Transparência e leads qualificados.'},
{h1:'Destaques que mudam a cada visita.',p:'Mais visibilidade para quem anuncia com Pro e Max.'},
{h1:'Do sonho à assinatura.',p:'Simule o financiamento e fale direto pelo WhatsApp.'},
{h1:'Anuncie e venda mais rápido.',p:'Planos com destaque e métricas no painel.'},
]

export default function SmartHero(){
  const[i,setI]=useState(0)
  
  useEffect(()=>{
    const t=setInterval(()=>setI(v=>(v+1)%copies.length),4500)
    return()=>clearInterval(t)
  },[])
  
  const c=copies[i]
  
  return(
    <section 
      style={{
        backgroundImage:"url('/bg-hero.svg')",
        backgroundSize:"cover",
        backgroundPosition:"center"
      }}
      className='relative text-white py-16 overflow-hidden'
    >
      <div className='absolute inset-0 bg-[#1e2f39cc]'></div>
      
      <motion.div 
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.8}}
        className='container relative z-10'
      >
        <motion.span 
          initial={{scale:0.8,opacity:0}}
          animate={{scale:1,opacity:1}}
          transition={{delay:0.2}}
          className='badge'
        >
          Azul Petróleo • Premium
        </motion.span>
        
        <motion.h1 
          key={i}
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          exit={{opacity:0,y:-20}}
          transition={{duration:0.6}}
          className='text-4xl md:text-5xl font-extrabold mt-3'
        >
          {c.h1}
        </motion.h1>
        
        <motion.p 
          key={`${i}-p`}
          initial={{opacity:0}}
          animate={{opacity:0.9}}
          transition={{delay:0.3,duration:0.5}}
          className='mt-2 text-lg'
        >
          {c.p}
        </motion.p>
        
        <motion.div 
          initial={{opacity:0,y:10}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.5,duration:0.5}}
          className='mt-6 flex flex-wrap gap-3'
        >
          <a href='/search' className='btn btn-primary bg-[var(--gold)] text-[var(--petroleum)] hover:opacity-90'>
            Buscar imóveis
          </a>
          <a href='/anunciar' className='btn btn-primary'>
            Anunciar agora
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
