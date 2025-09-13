"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function TwoBoxSection() {
  const { t } = useLanguage()
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-green-800 mb-4">{t("about.title")}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left Side - Hero Photo */}
          <div className="flex justify-center">
            <Image
              src="/main.jpg"
              alt="Modern agriculture showcasing farmers with seedlings and traditional farming methods"
              width={400}
              height={300}
              className="h-auto object-cover rounded-lg"
              priority
            />
            </div>

          {/* Right Side - About Krishi-Sathi */}
          <div className="max-w-prose">
            <p className="text-gray-700 leading-relaxed mb-6">
              {t("about.intro")}
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-green-600 mb-4">{t("about.core_features")}</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 text-lg">🔹</span>
                    <span><strong>{t("about.pest_detection")}</strong> <span className="font-bold text-blue-400">{t("keywords.ai_powered")}</span> {t("about.pest_detection_desc")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 text-lg">🔹</span>
                    <span><strong>{t("about.weather_advisory")}</strong> <span className="font-bold text-blue-400">{t("keywords.real_time")}</span> {t("about.weather_advisory_desc")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 text-lg">🔹</span>
                    <span><strong>{t("about.gov_integration")}</strong> {t("about.gov_integration_desc")}</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200 my-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
