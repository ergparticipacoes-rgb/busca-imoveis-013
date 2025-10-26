'use client'
import {motion} from 'framer-motion'

export default function RepsSection(){
  return(
    <motion.section 
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.6}}
      className='container py-12 md:py-16'
    >
      <motion.div 
        whileHover={{scale:1.02}}
        className='card text-center'
      >
        <div className='badge'>Representantes Digitais</div>
        <h2 className='text-2xl font-bold mt-2 text-[var(--petroleum)]'>
          Ganhe comissões indicando anunciantes
        </h2>
        <p className='mt-1 text-gray-700'>
          Participe da nossa rede e ajude a expandir o Busca Imóveis 013 pela Baixada Santista.
        </p>
        <a href='/anunciar' className='btn btn-primary mt-4'>
          Quero ser representante
        </a>
      </motion.div>
    </motion.section>
  )
}
