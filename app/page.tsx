import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TwoBoxSection } from "@/components/two-box-section"
import { ServiceCards } from "@/components/service-cards"
import { PolicySection } from "@/components/policy-section"
import { BlogCarousel } from "@/components/blog-carousel"
import { GovernmentSchemes } from "@/components/government-schemes"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TwoBoxSection />
      <ServiceCards />
      <PolicySection />
      <BlogCarousel />
      <GovernmentSchemes />
      <Footer />
    </main>
  )
}
