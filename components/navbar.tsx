"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Leaf, Globe, LogOut, User } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.contact"), href: "#contact" },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (href.startsWith('/')) {
      router.push(href)
    }
  }

  return (
    <nav className="sticky top-0 z-50 h-20 bg-green-600 border-b border-green-700 ag-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 relative">
              <Image 
                src="/this.png" 
                alt="Krishi-Sathi Logo" 
                width={56}
                height={56}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-heading font-semibold text-2xl text-white">Krishi-Sathi</span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              {/* Language Toggle Switch */}
              <div className="flex items-center bg-black rounded-full p-1">
                <button
                  onClick={() => setLanguage("english")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    language === "english"
                      ? "bg-white text-black shadow-sm"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("malayalam")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    language === "malayalam"
                      ? "bg-white text-black shadow-sm"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  മലയാളം
                </button>
              </div>
              {user && user.isVerified ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-full border-white bg-white text-black hover:bg-gray-100 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleLogin}
                  className="rounded-full border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-300 hover:border-yellow-300 transition-all duration-200"
                >
                  {t("nav.login")}
                </Button>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isOpen && (
          <div className="md:hidden bg-green-600 border-t border-green-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleNavClick(link.href)
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300 transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
              {/* Mobile Language Toggle Switch */}
              <div className="px-3 py-2">
                <div className="flex items-center bg-black rounded-full p-1 w-full">
                  <button
                    onClick={() => setLanguage("english")}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 ${
                      language === "english"
                        ? "bg-white text-black shadow-sm"
                        : "text-white hover:text-gray-300"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("malayalam")}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 ${
                      language === "malayalam"
                        ? "bg-white text-black shadow-sm"
                        : "text-white hover:text-gray-300"
                    }`}
                  >
                    മലയാളം
                  </button>
                </div>
              </div>
              <div className="px-3 py-2">
                  {user && user.isVerified ? (
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full rounded-full border-white bg-white text-black hover:bg-gray-100 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleLogin}
                    className="w-full rounded-full border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-300 hover:border-yellow-300 transition-all duration-200"
                  >
                    {t("nav.login")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
