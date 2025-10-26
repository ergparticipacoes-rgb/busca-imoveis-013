'use client'
import {useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import {brl} from '../lib/utils'
import data from '../public/data/fakeListings.json'

export default function HighlightsGrid(){
  const featured=data.filter(it=>it.plan==='pro'||it.plan==='max').slice(0,6)
  const[currentIndex,setCurrentIndex]=useState(0)
  const[isPaused,setIsPaused]=useState(false)
  
  useEffect(()=>{
    if(!isPaused){
      const timer=setInterval(()=>{
        setCurrentIndex(prev=>(prev+1)%featured.length)
      },5000)
      return()=>clearInterval(timer)
    }
  },[isPaused,featured.length])
  
  const visibleItems=3
  const getVisibleCards=()=>{
    const cards=[]
    for(let i=0;i<visibleItems;i++){
      const index=(currentIndex+i)%featured.length
      cards.push(featured[index])
    }
    return cards
  }
  
  return(
    <motion.section 
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.6}}
      className='container py-12 md:py-16'
      onMouseEnter={()=>setIsPaused(true)}
      onMouseLeave={()=>setIsPaused(false)}
    >
      <h2 className='text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--petroleum)] mb-6 flex items-center gap-2'>
        <span className='text-[var(--gold)] text-3xl'>✨</span>
        Destaques
      </h2>
      
      <div className='relative overflow-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {getVisibleCards().map((item,idx)=>(
            <motion.div
              key={`${item._id}-${currentIndex}-${idx}`}
              initial={{opacity:0,x:100}}
              animate={{opacity:1,x:0}}
              transition={{duration:0.5,delay:idx*0.1,ease:'easeOut'}}
              whileHover={{y:-4}}
              className='relative'
            >
              <HighlightCard item={item}/>
            </motion.div>
          ))}
        </div>
        
        <div className='flex justify-center gap-2 mt-6'>
          {featured.map((_,idx)=>(
            <button
              key={idx}
              onClick={()=>setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx===currentIndex
                  ?'w-8 bg-[var(--gold)]'
                  :'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir para slide ${idx+1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function HighlightCard({item}:{item:any}){
  const isPremium=item.plan==='max'||item.plan==='pro'
  const badgeColor=item.plan==='max'?'bg-[var(--gold)]':'bg-[var(--gold-light)]'
  
  return(
    <div className={`card rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden group ${
      isPremium?'border-2 border-[var(--gold)]/30':'border border-gray-200'}
    `}>
      {isPremium&&(
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent animate-shimmer-slow pointer-events-none'></div>
      )}
      
      <div className='h-44 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl relative overflow-hidden'>
        <div className='absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium'>
          🏠 {item.type}
        </div>
      </div>
      
      <div className='mt-3 flex justify-between items-start relative z-10'>
        <h3 className='font-semibold text-[var(--petroleum)] text-base group-hover:text-[var(--gold)] transition-colors'>
          {item.title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-md font-bold text-[var(--petroleum)] ${badgeColor} shadow-sm`}>
          {item.plan.toUpperCase()}
        </span>
      </div>
      
      <p className='text-lg font-extrabold text-[var(--gold)] mt-2'>
        {brl(Number(item.price))}
      </p>
      
      <div className='flex gap-3 text-sm text-gray-600 mt-2'>
        <span>🛏️ {item.bedrooms}</span>
        <span>🚿 {item.bathrooms}</span>
        <span>📐 {item.area}m²</span>
      </div>
      
      <p className='text-sm text-gray-500 mt-2'>
        📍 {item.city}
      </p>
      
      <a 
        href={'/imovel/'+item._id} 
        className='btn btn-primary mt-4 w-full text-center text-sm hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]'
        aria-label={`Ver detalhes de ${item.title}`}
      >
        Ver detalhes
      </a>
    </div>
  )
}
