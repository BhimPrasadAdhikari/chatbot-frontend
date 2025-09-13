"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, Users, Zap, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function PolicySection() {
  const { t } = useLanguage()
  
  const policyPoints = [
    t("policy.automates_queries"),
    t("policy.seamless_integration"),
    t("policy.reduces_workload"),
    t("policy.standardized_info"),
    t("policy.data_driven_decisions"),
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <Card className="p-8 md:p-12 bg-gray-200 rounded-xl ag-shadow border-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl ag-text mb-6">{t("policy.title")}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t("policy.description")}
              </p>

              <div className="space-y-3">
                {policyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#2B9348] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 ag-primary rounded-lg mx-auto mb-2">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-semibold text-[#2B9348]">500+</div>
                  <div className="text-xs text-gray-600">{t("policy.krishibhavans")}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 ag-primary rounded-lg mx-auto mb-2">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-semibold text-[#2B9348]">90%</div>
                  <div className="text-xs text-gray-600">{t("policy.query_resolution")}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 ag-primary rounded-lg mx-auto mb-2">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-semibold text-[#2B9348]">24/7</div>
                  <div className="text-xs text-gray-600">{t("policy.availability")}</div>
                </div>
              </div>
            </div>

            {/* Right Column - Image/Upload Area */}
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden ag-shadow">
                <img
                  src="/laptop.jpg"
                  alt="Government agricultural office"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
