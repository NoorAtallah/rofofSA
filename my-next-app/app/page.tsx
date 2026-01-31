
import RofofHero from './components/hero'
import RofofGallery from './components/gallery'
import FeaturesSection from './components/feature'
import CalculatorSection from './components/calculater'
import RofofMenuSection from './components/menu'
import RofofFooter from './components/footer'
export default function Home() {
  return (
    <main>
      <RofofHero />
      <RofofGallery />
      <FeaturesSection />
      <CalculatorSection />
      <RofofMenuSection />
      <RofofFooter />
    </main>
  )
}
