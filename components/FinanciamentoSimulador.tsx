'use client'
import {useState} from 'react'
import {motion} from 'framer-motion'
import {brl} from '../lib/utils'

export default function FinanciamentoSimulador(){
  const[valor,setValor]=useState(500000)
  const[entrada,setEntrada]=useState(100000)
  const[taxa,setTaxa]=useState(0.8)
  const[meses,setMeses]=useState(360)
  
  function calcularPMT(){
    const montante=valor-entrada
    if(montante<=0)return 0
    const taxaMensal=taxa/100
    if(taxaMensal===0)return montante/meses
    return montante*(taxaMensal*Math.pow(1+taxaMensal,meses))/(Math.pow(1+taxaMensal,meses)-1)
  }
  
  const parcela=calcularPMT()
  
  return(
    <motion.section 
      initial={{opacity:0,y:30}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.7}}
      className='container py-12 md:py-16'
    >
      <div className='rounded-2xl bg-gradient-to-br from-white via-[#f9f9f9] to-[#f1f1f1] border-2 border-[var(--gold)]/40 shadow-[0_4px_18px_rgba(0,0,0,0.05)] p-10'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-[var(--petroleum)] mb-3 tracking-tight antialiased'>
            Simulador de Financiamento
          </h2>
          <p className='text-xl font-semibold text-gray-700 tracking-tight'>
            Calcule sua parcela
          </p>
          <p className='text-sm text-gray-600 mt-2'>
            Simule o financiamento do seu imóvel dos sonhos
          </p>
        </div>
        
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold text-[var(--petroleum)] mb-1'>
                Valor do Imóvel
              </label>
              <input 
                type='range' 
                min='100000' 
                max='3000000' 
                step='10000'
                value={valor}
                onChange={e=>setValor(Number(e.target.value))}
                className='w-full'
              />
              <div className='text-right text-sm font-bold text-[var(--gold)]'>
                {brl(valor)}
              </div>
            </div>
            
            <div>
              <label className='block text-sm font-semibold text-[var(--petroleum)] mb-1'>
                Entrada
              </label>
              <input 
                type='range' 
                min='0' 
                max={valor*0.5} 
                step='5000'
                value={entrada}
                onChange={e=>setEntrada(Number(e.target.value))}
                className='w-full'
              />
              <div className='text-right text-sm font-bold text-[var(--gold)]'>
                {brl(entrada)}
              </div>
            </div>
            
            <div>
              <label className='block text-sm font-semibold text-[var(--petroleum)] mb-1'>
                Taxa de Juros (% ao mês)
              </label>
              <input 
                type='range' 
                min='0.3' 
                max='1.5' 
                step='0.1'
                value={taxa}
                onChange={e=>setTaxa(Number(e.target.value))}
                className='w-full'
              />
              <div className='text-right text-sm font-bold text-[var(--gold)]'>
                {taxa.toFixed(1)}% a.m.
              </div>
            </div>
            
            <div>
              <label className='block text-sm font-semibold text-[var(--petroleum)] mb-1'>
                Prazo (meses)
              </label>
              <input 
                type='range' 
                min='60' 
                max='420' 
                step='12'
                value={meses}
                onChange={e=>setMeses(Number(e.target.value))}
                className='w-full'
              />
              <div className='text-right text-sm font-bold text-[var(--gold)]'>
                {meses} meses ({Math.floor(meses/12)} anos)
              </div>
            </div>
          </div>
          
          <div className='flex flex-col justify-center items-center bg-[var(--petroleum)] text-white rounded-xl p-6'>
            <div className='text-sm opacity-80 mb-2'>Parcela mensal estimada</div>
            <div className='text-4xl font-extrabold mb-1'>
              {brl(parcela)}
            </div>
            <div className='text-xs opacity-70 mb-4'>
              Total: {brl(parcela*meses)}
            </div>
            <div className='w-full h-px bg-white/20 my-3'></div>
            <div className='text-xs text-center opacity-80 mb-4'>
              Valores aproximados. Consulte um especialista para simulação personalizada.
            </div>
            <a 
              href='https://wa.me/5513999999999?text=Olá! Gostaria de falar sobre financiamento.' 
              target='_blank'
              rel='noopener noreferrer'
              className='btn bg-gradient-to-r from-[var(--gold)] to-[#ffd166] text-[var(--petroleum)] hover:scale-105 hover:shadow-[0_0_10px_rgba(255,215,0,0.4)] transition-all duration-300 w-full text-center font-semibold'
            >
              💬 Falar com consultor
            </a>
          </div>
        </div>
        
        <div className='flex items-center justify-center gap-2 mt-6 text-sm text-gray-600'>
          <span className='text-green-600 text-lg'>🔒</span>
          <span>Seus dados são protegidos pela plataforma Busca Imóveis 013®.</span>
        </div>
      </div>
    </motion.section>
  )
}

