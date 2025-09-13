"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, MapPin, FileText, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function GovernmentSchemes() {
  const { t } = useLanguage()
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")

  const handleSchemeClick = (url: string) => {
    if (url) {
      window.open(url, '_blank')
    } else {
      console.log('No URL provided for this scheme')
    }
  }

  const schemes = [
    {
      title: t("schemes.pm_kisan.title"),
      description: t("schemes.pm_kisan.description"),
      eligibility: t("schemes.pm_kisan.eligibility"),
      amount: t("schemes.pm_kisan.amount"),
      url: "https://pmkisan.gov.in/homenew.aspx", 
    },
    {
      title: t("schemes.crop_insurance.title"),
      description: t("schemes.crop_insurance.description"),
      eligibility: t("schemes.crop_insurance.eligibility"),
      amount: t("schemes.crop_insurance.amount"),
      url: "https://pmfby.gov.in/", 
    },
    {
      title: t("schemes.soil_health.title"),
      description: t("schemes.soil_health.description"),
      eligibility: t("schemes.soil_health.eligibility"),
      amount: t("schemes.soil_health.amount"),
      url: "https://soilhealth.dac.gov.in/home", 
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ag-primary-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-3xl md:text-4xl ag-text mb-4">
            {t("schemes.title")}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("schemes.subtitle")}
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="p-6 mb-8 bg-white rounded-xl ag-shadow border-0">
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium ag-text mb-2">Select State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AEEBC1] focus:border-[#2B9348] outline-none"
                title="Select State"
              >
                <option value="">Choose State</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="punjab">Punjab</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="karnataka">Karnataka</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium ag-text mb-2">Select District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AEEBC1] focus:border-[#2B9348] outline-none"
                disabled={!selectedState}
                title="Select District"
              >
                <option value="">Choose District</option>
                <option value="pune">Pune</option>
                <option value="mumbai">Mumbai</option>
                <option value="nashik">Nashik</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium ag-text mb-2">Search Schemes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by keyword..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AEEBC1] focus:border-[#2B9348] outline-none"
                />
              </div>
            </div>

            <button
              className="bg-[#2B9348] hover:bg-[#1B5E3B] text-white rounded-lg h-12 px-4 py-2 flex items-center justify-center font-medium transition-colors duration-200 border-0 outline-none focus:ring-2 focus:ring-[#AEEBC1] focus:ring-offset-2"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Schemes
            </button>
          </div>
        </Card>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {schemes.map((scheme, index) => (
            <Card
              key={index}
              className="p-6 bg-white rounded-xl ag-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
            >
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-[#2B9348] flex-shrink-0" />
                <span className="text-sm font-medium text-[#2B9348] bg-[#E8F6EC] px-3 py-1 rounded-full">
                  {scheme.amount}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-xl ag-text mb-3">{scheme.title}</h3>

              <p className="text-gray-700 mb-4 leading-relaxed">{scheme.description}</p>

              <div className="mb-4">
                <span className="text-sm font-medium ag-text">{t("schemes.eligibility")}: </span>
                <span className="text-sm text-gray-600">{scheme.eligibility}</span>
              </div>

              <Button
                variant="outline"
                className="w-full rounded-full border-[#2B9348] text-[#2B9348] hover:bg-[#2B9348] hover:text-white bg-transparent"
                onClick={() => handleSchemeClick(scheme.url)}
              >
                {t("schemes.learn_more")}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            size="lg"
            className="ag-primary hover:bg-[#1B5E3B] text-white rounded-full px-8 py-3 text-lg font-medium ag-shadow"
          >
            <MapPin className="w-5 h-5 mr-2" />
            {t("schemes.view_all")}
          </Button>
        </div>
      </div>
    </section>
  )
}
