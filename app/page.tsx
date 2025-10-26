import HeroCinematic from '../components/HeroCinematic'
import SearchQuick from '../components/SearchQuick'
import HighlightsGrid from '../components/HighlightsGrid'
import HighlightsGridSecondary from '../components/HighlightsGridSecondary'
import StepsHowItWorks from '../components/StepsHowItWorks'
import BannerCTA from '../components/BannerCTA'
import PlansSection from '../components/PlansSection'
import FinanciamentoSimulador from '../components/FinanciamentoSimulador'
import RepsSection from '../components/RepsSection'
import FAQSection from '../components/FAQSection'

export default function Home(){
  return(
    <>
      <HeroCinematic/>
      
      {/* Hero → Busca: mt-10 md:mt-16 lg:mt-20 */}
      <section className='container mt-10 md:mt-16 lg:mt-20 relative z-10'>
        <SearchQuick/>
      </section>
      
      {/* Busca → Destaques: mt-16 */}
      <div className='mt-16'>
        <HighlightsGrid/>
      </div>
      
      {/* Destaques 1 → Destaques 2 */}
      <HighlightsGridSecondary/>
      
      {/* Destaques → CTA1: mt-20 mb-20 */}
      <div className='mt-20 mb-20'>
        <BannerCTA 
          emoji='🏡'
          text='Encontre o imóvel certo com um clique.'
          buttonText='Ver imóveis'
          href='/search'
        />
      </div>
      
      {/* CTA1 → Como funciona: mt-12 mb-12 */}
      <div className='mt-12 mb-12'>
        <StepsHowItWorks/>
      </div>
      
      {/* Como funciona → CTA2: mt-16 mb-16 */}
      <div className='mt-16 mb-16'>
        <BannerCTA 
          emoji='💬'
          text='Fale com corretores parceiros e negocie direto.'
          buttonText='Ver imóveis'
          href='/search'
        />
      </div>
      
      {/* CTA2 → Planos: mt-20 mb-20 */}
      <div className='mt-20 mb-20'>
        <PlansSection/>
      </div>
      
      {/* Planos → Simulador: mt-16 mb-16 */}
      <div className='mt-16 mb-16'>
        <FinanciamentoSimulador/>
      </div>
      
      {/* Simulador → Representantes: mt-20 mb-20 */}
      <div className='mt-20 mb-20'>
        <RepsSection/>
      </div>
      
      {/* Representantes → FAQ: mt-16 mb-16 */}
      <div className='mt-16 mb-16'>
        <FAQSection/>
      </div>
      
      {/* FAQ → Rodapé: mt-20 mb-0 (mb-0 é padrão) */}
      <div className='mt-20'>
        {/* Espaço antes do footer */}
      </div>
    </>
  )
}
