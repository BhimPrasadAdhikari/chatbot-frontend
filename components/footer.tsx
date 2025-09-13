"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer id="contact" className="bg-[#1B5E3B] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#2B9348] rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-semibold text-xl">AgriTech</span>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-white hover:text-[#2B9348] hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:text-[#2B9348] hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:text-[#2B9348] hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:text-[#2B9348] hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2">
              {[t("nav.home"), t("nav.about"), t("nav.features"), t("footer.blog"), t("nav.contact")].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{t("footer.contact_info")}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#2B9348]" />
                <span className="text-white/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#2B9348]" />
                <span className="text-white/80">info@agritech.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#2B9348] mt-0.5" />
                <span className="text-white/80">
                  123 Agriculture Hub,
                  <br />
                  Green Valley, Mumbai 400001
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{t("footer.newsletter")}</h4>
            <p className="text-white/80 mb-4">
              {t("footer.newsletter_desc")}
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t("footer.email_placeholder")}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#2B9348] focus:border-transparent"
              />
              <Button className="w-full bg-[#2B9348] hover:bg-[#2B9348]/80 text-white rounded-lg">{t("footer.subscribe")}</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">{t("footer.copyright")}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                {t("footer.privacy_policy")}
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                {t("footer.terms_of_service")}
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                {t("footer.cookie_policy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
