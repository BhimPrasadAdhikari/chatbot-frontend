import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "AgriTech - Modern Agriculture Solutions",
  description: "Empowering farmers with modern technology and sustainable practices",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${poppins.variable} ${inter.variable}`}>
        <LanguageProvider>
          <AuthProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
