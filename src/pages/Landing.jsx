import { ReactLenis } from 'lenis/react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LogoStrip from '../components/LogoStrip'
import Services from '../components/Services'
import Process from '../components/Process'
import CaseStudies from '../components/CaseStudies'
import Benefits from '../components/Benefits'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-dark">
        <Navbar />
        <main>
          <Hero />
          <LogoStrip />
          <Services />
          <Process />
          <CaseStudies />
          <Benefits />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default Landing
