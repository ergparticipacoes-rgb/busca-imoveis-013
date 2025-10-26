'use client'
import {useState,useRef,useEffect}from'react'
import {useRouter}from'next/navigation'
import {motion} from 'framer-motion'

const cities=['Bertioga','Cubatão','Guarujá','Itanhaém','Mongaguá','Peruíbe','Praia Grande','Santos','São Vicente']
const purposes=['Venda','Locação','Temporada']
const types=['Casa','Apartamento','Cobertura','Sobrado','Kitnet','Terreno','Chácara','Comercial']

const MIN_PRICE=50000
const MAX_PRICE=10000000
const PRICE_STEP=10000
const DEFAULT_MIN=150000
const DEFAULT_MAX=1000000

// Escala não-linear: 0-70% = 50k-1M, 70-100% = 1M-10M
const BREAKPOINT=1000000
const BREAKPOINT_PERCENT=70

const priceToPercent=(price:number):number=>{
  if(price<=BREAKPOINT){
    return(price-MIN_PRICE)/(BREAKPOINT-MIN_PRICE)*BREAKPOINT_PERCENT
  }else{
    const remaining=(price-BREAKPOINT)/(MAX_PRICE-BREAKPOINT)
    return BREAKPOINT_PERCENT+remaining*(100-BREAKPOINT_PERCENT)
  }
}

const percentToPrice=(percent:number):number=>{
  if(percent<=BREAKPOINT_PERCENT){
    return MIN_PRICE+(percent/BREAKPOINT_PERCENT)*(BREAKPOINT-MIN_PRICE)
  }else{
    const remaining=(percent-BREAKPOINT_PERCENT)/(100-BREAKPOINT_PERCENT)
    return BREAKPOINT+remaining*(MAX_PRICE-BREAKPOINT)
  }
}

const ticks=[
  {value:100000,label:'100k'},
  {value:300000,label:'300k'},
  {value:500000,label:'500k'},
  {value:700000,label:'700k'},
  {value:1000000,label:'1mi'},
  {value:3000000,label:'3mi'},
  {value:5000000,label:'5mi'},
  {value:MAX_PRICE,label:'Máx'}
]

export default function SearchQuick(){
  const[city,setCity]=useState('')
  const[purpose,setPurpose]=useState('')
  const[type,setType]=useState('')
  const[priceMin,setPriceMin]=useState(DEFAULT_MIN)
  const[priceMax,setPriceMax]=useState(DEFAULT_MAX)
  const[showCities,setShowCities]=useState(false)
  const[selectedIndex,setSelectedIndex]=useState(-1)
  const[showMinTooltip,setShowMinTooltip]=useState(false)
  const[showMaxTooltip,setShowMaxTooltip]=useState(false)
  const cityInputRef=useRef<HTMLInputElement>(null)
  const router=useRouter()
  
  const formatPrice=(value:number,short:boolean=false)=>{
    if(short&&value>=1000000){
      return`R$ ${(value/1000000).toFixed(1)}mi`
    }
    return new Intl.NumberFormat('pt-BR',{
      style:'currency',
      currency:'BRL',
      minimumFractionDigits:0,
      maximumFractionDigits:0
    }).format(value)
  }
  
  const getPriceLabel=(value:number,isMax:boolean)=>{
    if(isMax&&value>=MAX_PRICE){
      return'Máximo'
    }
    return formatPrice(value)
  }
  
  const handleSearch=()=>{
    const params=new URLSearchParams()
    if(city)params.set('city',city)
    if(purpose)params.set('purpose',purpose)
    if(type)params.set('type',type)
    params.set('min',priceMin.toString())
    
    if(priceMax<MAX_PRICE){
      params.set('max',priceMax.toString())
    }
    
    const queryString=params.toString()
    console.log('🔍 Query Inteligente v2.7.2:', {
      url: `/search?${queryString}`,
      filters: {
        cidade: city || 'Todas',
        finalidade: purpose || 'Todas',
        tipo: type || 'Todos',
        precoMin: formatPrice(priceMin),
        precoMax: priceMax>=MAX_PRICE?'Sem limite':formatPrice(priceMax)
      }
    })
    
    router.push('/search?'+queryString)
  }
  
  const filteredCities=cities.filter(c=>c.toLowerCase().includes(city.toLowerCase()))
  
  const handleCityKeyDown=(e:React.KeyboardEvent)=>{
    if(!showCities||filteredCities.length===0)return
    
    if(e.key==='ArrowDown'){
      e.preventDefault()
      setSelectedIndex(prev=>Math.min(prev+1,filteredCities.length-1))
    }else if(e.key==='ArrowUp'){
      e.preventDefault()
      setSelectedIndex(prev=>Math.max(prev-1,-1))
    }else if(e.key==='Enter'&&selectedIndex>=0){
      e.preventDefault()
      setCity(filteredCities[selectedIndex])
      setShowCities(false)
      setSelectedIndex(-1)
    }else if(e.key==='Escape'){
      setShowCities(false)
      setSelectedIndex(-1)
    }
  }
  
  useEffect(()=>{
    const handleClickOutside=(e:MouseEvent)=>{
      if(cityInputRef.current&&!cityInputRef.current.contains(e.target as Node)){
        setShowCities(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return()=>document.removeEventListener('mousedown',handleClickOutside)
  },[])
  
  const handleMinChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const percent=parseFloat(e.target.value)
    const val=Math.round(percentToPrice(percent)/PRICE_STEP)*PRICE_STEP
    if(val<=priceMax-PRICE_STEP){
      setPriceMin(val)
    }
  }
  
  const handleMaxChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const percent=parseFloat(e.target.value)
    const val=Math.round(percentToPrice(percent)/PRICE_STEP)*PRICE_STEP
    if(val>=priceMin+PRICE_STEP){
      setPriceMax(val)
    }
  }
  
  const minPercent=priceToPercent(priceMin)
  const maxPercent=priceToPercent(priceMax)
  
  return(
    <motion.div 
      initial={{opacity:0,y:-20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.6,delay:0.3}}
      className='card shadow-lg'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Cidade/Região com Autocomplete */}
        <div className='relative' ref={cityInputRef}>
          <label className='block text-xs font-semibold text-[var(--petroleum)] mb-1'>
            Cidade/Região
          </label>
          <input 
            value={city}
            onChange={e=>{setCity(e.target.value);setShowCities(true);setSelectedIndex(-1)}}
            onFocus={()=>setShowCities(true)}
            onKeyDown={handleCityKeyDown}
            placeholder='Digite para buscar...'
            className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4FB2C1] outline-none transition text-sm'
          />
          {showCities&&filteredCities.length>0&&(
            <div className='absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-xl max-h-60 overflow-y-auto'>
              {filteredCities.map((c,idx)=>(
                <button
                  key={c}
                  onClick={()=>{setCity(c);setShowCities(false);setSelectedIndex(-1)}}
                  className={`w-full text-left px-3 py-2 hover:bg-[#4FB2C1]/20 transition text-sm font-medium ${
                    idx===selectedIndex?'bg-[#4FB2C1]/30 font-semibold':''
                  }`}
                >
                  📍 {c}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Finalidade */}
        <div>
          <label className='block text-xs font-semibold text-[var(--petroleum)] mb-1'>
            Finalidade
          </label>
          <select
            value={purpose}
            onChange={e=>setPurpose(e.target.value)}
            className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4FB2C1] outline-none transition text-sm font-medium'
          >
            <option value=''>Todas</option>
            {purposes.map(p=><option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        
        {/* Tipo */}
        <div>
          <label className='block text-xs font-semibold text-[var(--petroleum)] mb-1'>
            Tipo de Imóvel
          </label>
          <select
            value={type}
            onChange={e=>setType(e.target.value)}
            className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4FB2C1] outline-none transition text-sm font-medium'
          >
            <option value=''>Todos</option>
            {types.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      
      {/* Slider Premium com Escala Não-Linear */}
      <div className='mt-8 px-3'>
        <label className='block text-sm font-bold text-[var(--petroleum)] mb-4 text-center'>
          Ajuste a Faixa de Preço
        </label>
        
        <div className='relative pt-8 pb-10 w-full md:w-[80%] mx-auto'>
          {/* Ticks Visuais */}
          <div className='absolute w-full top-6 flex justify-between px-1'>
            {ticks.map(tick=>(
              <div 
                key={tick.value}
                className='flex flex-col items-center'
                style={{left:`${priceToPercent(tick.value)}%`,position:'absolute',transform:'translateX(-50%)'}}
              >
                <div className='w-px h-2 bg-gray-300'/>
                <span className='text-[10px] text-gray-500 mt-1 whitespace-nowrap'>{tick.label}</span>
              </div>
            ))}
          </div>
          
          {/* Track do Slider com Gradiente Premium */}
          <div className='relative h-2 bg-gray-200 rounded-full mt-4'>
            <div 
              className='absolute h-2 bg-gradient-to-r from-[#4FB2C1] via-[#8B5CF6] to-[var(--gold)] rounded-full'
              style={{
                left: `${minPercent}%`,
                right: `${100-maxPercent}%`
              }}
            />
          </div>
          
          {/* Input Range Mínimo */}
          <div className='relative'>
            <input
              type='range'
              min={0}
              max={100}
              step={0.1}
              value={minPercent}
              onChange={handleMinChange}
              onMouseEnter={()=>setShowMinTooltip(true)}
              onMouseLeave={()=>setShowMinTooltip(false)}
              onTouchStart={()=>setShowMinTooltip(true)}
              onTouchEnd={()=>setShowMinTooltip(false)}
              className='absolute w-full h-2 top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--gold)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1e2f39] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--gold)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#1e2f39]'
            />
            {/* Tooltip Mínimo */}
            {showMinTooltip&&(
              <div 
                className='absolute -top-10 bg-[var(--petroleum)] text-[var(--gold)] text-xs rounded-md px-2 py-1 shadow-md whitespace-nowrap font-semibold z-10'
                style={{left:`${minPercent}%`,transform:'translateX(-50%)'}}
              >
                {formatPrice(priceMin,true)}
              </div>
            )}
          </div>
          
          {/* Input Range Máximo */}
          <div className='relative'>
            <input
              type='range'
              min={0}
              max={100}
              step={0.1}
              value={maxPercent}
              onChange={handleMaxChange}
              onMouseEnter={()=>setShowMaxTooltip(true)}
              onMouseLeave={()=>setShowMaxTooltip(false)}
              onTouchStart={()=>setShowMaxTooltip(true)}
              onTouchEnd={()=>setShowMaxTooltip(false)}
              className='absolute w-full h-2 top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--gold)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1e2f39] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--gold)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#1e2f39]'
            />
            {/* Tooltip Máximo */}
            {showMaxTooltip&&(
              <div 
                className='absolute -top-10 bg-[var(--petroleum)] text-[var(--gold)] text-xs rounded-md px-2 py-1 shadow-md whitespace-nowrap font-semibold z-10'
                style={{left:`${maxPercent}%`,transform:'translateX(-50%)'}}
              >
                {priceMax>=MAX_PRICE?'Máximo':formatPrice(priceMax,true)}
              </div>
            )}
          </div>
        </div>
        
        {/* Valores Formatados */}
        <div className='flex justify-between items-center text-base font-bold text-[var(--petroleum)] mt-4 px-4'>
          <span>{getPriceLabel(priceMin,false)}</span>
          <span className='text-xs text-gray-500 font-normal'>até</span>
          <span className={priceMax>=MAX_PRICE?'text-[#4FB2C1]':''}>{getPriceLabel(priceMax,true)}</span>
        </div>
        
        {/* Microcopy Educativa */}
        <p className='text-xs text-gray-600 mt-4 text-center italic leading-relaxed px-2'>
          💡 Ajuste o valor da sua busca — a maioria dos imóveis está abaixo de R$ 1 milhão, mas você pode explorar valores maiores.
        </p>
      </div>
      
      {/* Botão de Busca */}
      <div className='flex justify-center mt-6'>
        <motion.button 
          onClick={handleSearch}
          whileHover={{scale:1.03}}
          whileTap={{scale:0.97}}
          className='btn btn-primary bg-gradient-to-r from-[#4FB2C1] to-[#3AA0AE] text-white hover:opacity-90 px-12 py-3 font-bold shadow-xl text-base rounded-lg'
        >
          🔍 Buscar Imóveis
        </motion.button>
      </div>
    </motion.div>
  )
}
