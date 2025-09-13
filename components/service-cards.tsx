"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function ServiceCards() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const services = [
    {
      title: t("services.disease_detection"),
      heading: t("services.disease_detection"),
      description: t("services.disease_detection_desc"),
      cta: t("services.ask_now"),
      circularImage: "/paid.png",
      features: [
        t("services.disease_feature1"),
        t("services.disease_feature2"),
        t("services.disease_feature3")
      ]
    },
    {
      title: t("services.digital_officer"),
      heading: t("services.digital_officer"),
      description: t("services.digital_officer_desc"),
      cta: t("services.ask_now"),
      circularImage: "/ai.jpg",
      features: [
        t("services.officer_feature1"),
        t("services.officer_feature2"), 
        t("services.officer_feature3")
      ]
    },
    {
      title: t("services.weather_forecast"),
      heading: t("services.weather_forecast"),
      description: t("services.weather_forecast_desc"),
      cta: t("services.ask_now"),
      circularImage: "/wheather.jpg",
      features: [
        t("services.weather_feature1"),
        t("services.weather_feature2"),
        t("services.weather_feature3")
      ]
    },
  ]

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-4xl md:text-5xl ag-text mb-6">{t("services.title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Infographic Card Design */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-80 flex flex-col items-center">
                {/* Circular Image */}
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6">
                  <Image 
                    src={service.circularImage} 
                    alt={service.title} 
                    width={56}
                    height={56}
                    className="object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                
                {/* Heading with line breaks */}
                <h3 className="font-bold text-lg text-gray-800 text-center mb-6 leading-tight whitespace-pre-line">
                  {service.heading}
                </h3>
                
                {/* Features List */}
                <ul className="space-y-2 text-sm text-gray-600 mb-6 flex-1">
                  {service.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="mr-3 flex-shrink-0">🔸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button
                  size="sm"
                  onClick={() => {
                    if (service.title === t("services.weather_forecast")) {
                      // Check if user is authenticated before accessing weather dashboard
                      if (user && user.isVerified) {
                        router.push('/weather')
                      } else {
                        router.push('/login')
                      }
                    } else {
                      // For chatbot, also check authentication
                      if (user && user.isVerified) {
                        router.push('/chatbot')
                      } else {
                        router.push('/login')
                      }
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="text-sm font-medium">
                    {service.title === t("services.weather_forecast") ? t("services.explore_data") : service.cta}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
