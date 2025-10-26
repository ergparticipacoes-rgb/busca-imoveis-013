'use client'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

export default function HeroCinematic(){
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return(
    <section className='relative text-white py-20 overflow-hidden min-h-[500px] flex items-center'>
      {/* Imagem de fundo hero-bg.webp */}
      <div 
        className='absolute inset-0 bg-cover bg-center'
        style={{ 
          backgroundImage: "url('/images/hero-bg.webp')"
        }}
      />
      
      {/* Overlay azul petróleo para contraste premium */}
      <div className='absolute inset-0 bg-[#1e2f39]/55' />
      
      {/* Conteúdo */}
      <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: isMounted ? 1 : 0}}
        transition={{duration: 1}}
        className='relative z-10 container text-center'
      >
        <motion.h1 
          initial={{opacity: 0, y: 30}}
          animate={{opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 30}}
          transition={{duration: 0.8, delay: 0.2}}
          className='text-4xl md:text-5xl font-extrabold mb-4 leading-tight'
        >
          🏠 Encontre o imóvel certo em segundos — nossa{' '}
          <span className='text-[var(--gold)] drop-shadow-[0_0_12px_rgba(245,166,35,0.5)]'>
            IA
          </span>{' '}
          entende o que você procura e mostra as melhores opções perto de você.
        </motion.h1>
        
        <motion.p 
          initial={{opacity: 0}}
          animate={{opacity: isMounted ? 0.9 : 0}}
          transition={{duration: 0.8, delay: 0.4}}
          className='text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8'
        >
          Imóveis verificados, fotos profissionais e experiências únicas na Baixada Santista.
        </motion.p>
        
        <motion.div 
          initial={{opacity: 0, y: 20}}
          animate={{opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20}}
          transition={{duration: 0.8, delay: 0.6}}
          className='flex flex-wrap justify-center gap-3'
        >
          <a 
            href='/search' 
            className='btn bg-[var(--gold)] text-[var(--petroleum)] hover:bg-[var(--gold-light)] font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]'
            aria-label='Buscar imóveis na Baixada Santista'
          >
            Buscar imóveis
          </a>
          <a 
            href='/anunciar' 
            className='btn border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--petroleum)] font-semibold px-8 py-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]'
            aria-label='Anunciar seu imóvel'
          >
            Anunciar agora
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

