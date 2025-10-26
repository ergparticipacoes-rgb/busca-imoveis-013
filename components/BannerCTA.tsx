'use client'
import {motion} from 'framer-motion'

interface BannerCTAProps{
  emoji:string
  text:string
  buttonText:string
  href:string
}

export default function BannerCTA({emoji,text,buttonText,href}:BannerCTAProps){
  return(
    <motion.section 
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.6}}
      className='container py-10 md:py-12'
    >
      <div className='relative overflow-hidden rounded-2xl bg-[#1e2f39cc] backdrop-blur-sm p-8 text-center text-white border border-[var(--gold)]/20'>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gold)]/5 to-transparent animate-shimmer'></div>
        <div className='relative z-10'>
          <span className='text-4xl mb-3 block'>{emoji}</span>
          <h3 className='text-2xl font-bold mb-4'>{text}</h3>
          <a href={href} className='btn btn-primary bg-[var(--gold)] text-[var(--petroleum)] hover:scale-105 transition-transform'>
            {buttonText}
          </a>
        </div>
      </div>
    </motion.section>
  )
}

