"use client"

import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t, language, setLanguage } = useLanguage()
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/20 to-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20">
        <h1 className="font-heading font-semibold text-4xl md:text-6xl lg:text-7xl ag-text mb-6 text-balance">
          {t("hero.title")}
        </h1>
        <h2 className="font-heading font-semibold text-2xl md:text-7xl lg:text-6xl text-yellow-300 mb-6 text-balance">
          Krishi-Sathi
        </h2>
      </div>
    </section>
  )
}
