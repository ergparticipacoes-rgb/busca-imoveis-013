'use client'
import {motion} from 'framer-motion'
import {useState} from 'react'

const imoveis = [
  { 
    tipo: "Casa", 
    nome: "Casa Moderna - Itanhaém", 
    preco: "R$ 650.000,00", 
    label: "PRO", 
    desc: "3 dorms • 2 vagas • Próx. à praia", 
    img: "/img/imovel1.jpg" 
  },
  { 
    tipo: "Apartamento", 
    nome: "Apartamento Alto Padrão - Santos", 
    preco: "R$ 1.290.000,00", 
    label: "MAX", 
    desc: "Vista mar • 3 suítes • 2 vagas", 
    img: "/img/imovel2.jpg" 
  },
  { 
    tipo: "Sobrado", 
    nome: "Sobrado Novo - Praia Grande", 
    preco: "R$ 780.000,00", 
    label: "PRO", 
    desc: "2 suítes • Área gourmet • Piscina", 
    img: "/img/imovel3.jpg" 
  },
  { 
    tipo: "Cobertura", 
    nome: "Cobertura Vista Mar - Guarujá", 
    preco: "R$ 2.450.000,00", 
    label: "MAX", 
    desc: "Luxo • 4 dorms • Terraço panorâmico", 
    img: "/img/imovel4.jpg" 
  }
]

function PropertyImage({ src, alt, tipo }: { src: string; alt: string; tipo: string }) {
  const [imageError, setImageError] = useState(false)

  return (
    <>
      {!imageError ? (
        <img 
          src={src} 
          alt={alt} 
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-semibold bg-gradient-to-br from-[#1e2f39]/5 via-gray-100 to-[#F5A623]/5">
          {tipo}
        </div>
      )}
    </>
  )
}

export default function HighlightsGridSecondary(){
  return(
    <section className="container py-12 md:py-16">
      <motion.h2 
        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.6}}
        className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--petroleum)] mb-6 flex items-center gap-2"
      >
        <span className="text-[var(--gold)] text-3xl">🏡</span>
        Novos imóveis adicionados recentemente
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imoveis.map((item, index) => (
          <motion.div
            key={index}
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:0.5,delay:index*0.1,ease:'easeOut'}}
            whileHover={{y:-4}}
            className="group relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[var(--gold)]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_6px_25px_rgba(0,0,0,0.12)]"
          >
            <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <PropertyImage src={item.img} alt={item.nome} tipo={item.tipo} />
              <div className="absolute top-2 left-2 bg-[var(--gold)] text-[var(--petroleum)] px-2 py-1 rounded-md text-xs font-bold shadow-sm z-10">
                {item.label}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-[var(--petroleum)] font-semibold text-base mb-1 group-hover:text-[var(--gold)] transition-colors">
                {item.nome}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
              <p className="text-lg font-extrabold text-[var(--gold)]">{item.preco}</p>
              <button className="mt-3 w-full btn bg-[var(--gold)] text-[var(--petroleum)] hover:bg-[var(--gold-light)] font-semibold text-sm py-2 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]">
                Ver detalhes
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

