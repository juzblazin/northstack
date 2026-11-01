import Nav from './sections/Nav'
import Hero from './sections/Hero'
import { AgentsGrid, BringAgents, CustomerLogos, FAQ, Integrations, Security, Testimonials, UseCases } from './sections/Sections'
import { CTA, Footer } from './sections/Footer'
import { faqs } from './data'

export default function App() {
  return (
    <div className="relative overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <AgentsGrid />
        <CustomerLogos />
        <Testimonials />
        <BringAgents />
        <Integrations />
        <UseCases />
        <Security />
        <FAQ items={faqs} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
