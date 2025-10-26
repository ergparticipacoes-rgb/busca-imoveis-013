import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Busca Imóveis 013 — Imóveis na Baixada Santista com IA',
  description: 'A plataforma mais inteligente de busca e anúncios imobiliários da Baixada Santista. Encontre casas, apartamentos e imóveis com inteligência artificial.',
  keywords: ['imóveis Baixada Santista', 'imóveis Santos', 'apartamentos Guarujá', 'casas Praia Grande', 'imóveis Itanhaém', 'busca imóveis IA', 'corretora Baixada Santista'],
  authors: [{ name: 'Busca Imóveis 013' }],
  creator: 'Busca Imóveis 013',
  publisher: 'Busca Imóveis 013',
  themeColor: '#1E2F39',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://buscaimoveis013.com.br',
    siteName: 'Busca Imóveis 013',
    title: 'Busca Imóveis 013 — Imóveis na Baixada Santista com IA',
    description: 'A plataforma mais inteligente de busca imobiliária do Brasil. Encontre o imóvel perfeito com inteligência artificial.',
    images: [
      {
        url: '/images/hero-bg.webp',
        width: 1920,
        height: 1080,
        alt: 'Busca Imóveis 013 - Baixada Santista',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Busca Imóveis 013 — Imóveis na Baixada Santista com IA',
    description: 'A plataforma mais inteligente de busca imobiliária do Brasil.',
    images: ['/images/hero-bg.webp'],
  },
}

export default function RootLayout({children}:{children:React.ReactNode}){
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Busca Imóveis 013',
    description: 'Plataforma de busca e anúncios de imóveis na Baixada Santista impulsionada por inteligência artificial',
    url: 'https://buscaimoveis013.com.br',
    logo: 'https://buscaimoveis013.com.br/icon-512.png',
    image: 'https://buscaimoveis013.com.br/images/hero-bg.webp',
    telephone: '+55-13-0000-0000',
    email: 'contato@buscaimoveis013.com.br',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santos',
      addressRegion: 'SP',
      postalCode: '11000-000',
      addressCountry: 'BR',
      streetAddress: 'Baixada Santista'
    },
    areaServed: [
      { '@type': 'City', name: 'Santos', '@id': 'https://www.wikidata.org/wiki/Q171617' },
      { '@type': 'City', name: 'Guarujá' },
      { '@type': 'City', name: 'Praia Grande' },
      { '@type': 'City', name: 'São Vicente' },
      { '@type': 'City', name: 'Itanhaém' },
      { '@type': 'City', name: 'Mongaguá' },
      { '@type': 'City', name: 'Peruíbe' },
      { '@type': 'City', name: 'Cubatão' },
      { '@type': 'City', name: 'Bertioga' }
    ],
    sameAs: [
      'https://www.facebook.com/buscaimoveis013',
      'https://www.instagram.com/buscaimoveis013',
      'https://www.linkedin.com/company/buscaimoveis013'
    ],
    priceRange: 'R$ 100.000 - R$ 10.000.000',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Boleto, Pix, Cartão de Crédito, Financiamento',
    openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-13:00'
  }

  return(
    <html lang='pt-BR' suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className='min-h-screen bg-gradient-to-b from-[#1e2f39] to-[#243b47]'>
        {recaptchaSiteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy='afterInteractive'
          />
        )}
        
        <header className='sticky top-0 z-50 backdrop-blur-md bg-[#1e2f39cc] border-b border-[var(--gold)]/20 shadow-lg'>
          <div className='container flex justify-between items-center h-16'>
            <div className='flex items-center gap-4 font-extrabold text-white text-xl md:text-2xl tracking-tight'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="38"
                height="38"
                className="text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
              >
                <path
                  d="M12 4C6 4 2 12 2 12s4 8 10 8 10-8 10-8-4-8-10-8Z"
                  stroke="#F5A623"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" fill="#ffffff" />
                <circle cx="12" cy="12" r="1.3" fill="#F5A623" />
              </svg>
              <span className='transition-all duration-300 ease-in-out hover:text-[var(--gold)] cursor-pointer'>
                Busca Imóveis 013<sup className='text-xs'>®</sup>
              </span>
            </div>
            <nav className='flex items-center gap-6 text-base'>
              <a href='/search' className='text-white hover:text-[var(--gold)] transition-colors font-medium flex items-center'>
                Buscar
              </a>
              <a href='/conta' className='text-white hover:text-[var(--gold)] transition-colors font-medium flex items-center'>
                Minha Conta
              </a>
              <a href='/anunciar' className='btn btn-primary bg-gradient-to-r from-[var(--gold)] to-[#ffd166] text-[var(--petroleum)] hover:scale-105 hover:shadow-lg font-semibold flex items-center transition-all duration-300'>
                Anunciar
              </a>
            </nav>
          </div>
        </header>
        
        <main className='bg-[#f6f9fb] py-10 min-h-screen'>
          {children}
        </main>
        
        <footer className='border-t bg-[#1e2f39] text-white'>
          <div className='container py-10 text-center'>
            <div className='text-base md:text-lg font-semibold text-[#FFC470] mb-4 tracking-tight'>
              Busca Imóveis 013<sup className='text-xs'>®</sup> — a forma mais inteligente de conectar pessoas e imóveis na Baixada Santista.
            </div>
            <div className='flex justify-center gap-6 text-sm text-white/80 mb-4'>
              <a href='/sobre' className='hover:text-[#FFD166] transition-colors'>Sobre</a>
              <a href='/termos' className='hover:text-[#FFD166] transition-colors'>Termos</a>
              <a href='/privacidade' className='hover:text-[#FFD166] transition-colors'>Privacidade</a>
              <a href='/contato' className='hover:text-[#FFD166] transition-colors'>Contato</a>
            </div>
            {recaptchaSiteKey && (
              <div className='text-xs text-white/60 mt-3'>
                Este site é protegido pelo reCAPTCHA e aplicam-se a{' '}
                <a 
                  href='https://policies.google.com/privacy' 
                  target='_blank' 
                  rel='noopener noreferrer' 
                  className='text-[#FFD166] hover:underline'
                >
                  Política de Privacidade
                </a>
                {' '}e os{' '}
                <a 
                  href='https://policies.google.com/terms' 
                  target='_blank' 
                  rel='noopener noreferrer' 
                  className='text-[#FFD166] hover:underline'
                >
                  Termos de Serviço
                </a>
                {' '}do Google.
              </div>
            )}
            <div className='text-gray-300 text-sm mt-8 text-center'>
              © 2025 Busca Imóveis 013® — Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
