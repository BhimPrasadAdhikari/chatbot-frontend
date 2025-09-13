"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/lib/language-context'
import { Phone, ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [error, setError] = useState('')
  const { login, verifyOTP, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate phone number format and ensure +91 prefix for API
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    if (!phone || !phoneRegex.test(phone)) {
      setError(t('login.invalid_phone'))
      return
    }

    // Ensure phone number has +91 prefix for 2Factor API
    let formattedPhone = phone
    if (phone.startsWith('91')) {
      formattedPhone = '+' + phone
    } else if (!phone.startsWith('+91')) {
      formattedPhone = '+91' + phone
    }

    try {
      await login(formattedPhone)
      setStep('otp')
    } catch (error) {
      setError(t('login.failed_send'))
    }
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!otp || otp.length !== 4) {
      setError(t('login.invalid_otp'))
      return
    }

    try {
      const isValid = await verifyOTP(otp)
      if (isValid) {
        // Redirect to home page after successful verification
        router.replace('/')
      } else {
        setError(t('login.failed_verify'))
      }
    } catch (error) {
      setError(t('login.failed_verify'))
    }
  }

  const handleBackToPhone = () => {
    setStep('phone')
    setOtp('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side with image */}
        <div className="hidden lg:block">
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/main.jpg"
              alt="Krishi Sathi - Agricultural Technology"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Welcome to Krishi Sathi</h2>
              <p className="text-lg opacity-90">
                Your trusted agricultural companion powered by AI
              </p>
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {step === 'phone' ? t('login.enter_phone') : t('login.verify_otp')}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {step === 'phone' 
                  ? t('login.phone_description')
                  : `${t('login.otp_description')} ${phone}`
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              {step === 'phone' ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      {t('login.phone_number')}
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value
                        
                        // Allow flexible input but guide towards +91 format
                        if (value.startsWith('+91')) {
                          // Allow +91 followed by up to 10 digits
                          const digits = value.slice(3).replace(/[^\d]/g, '').slice(0, 10)
                          setPhone('+91' + digits)
                        } else if (value.startsWith('91')) {
                          // Allow 91 followed by up to 10 digits, auto-add +
                          const digits = value.slice(2).replace(/[^\d]/g, '').slice(0, 10)
                          setPhone('+91' + digits)
                        } else if (value.startsWith('+')) {
                          // If user types + but not +91, allow but limit to reasonable length
                          const digits = value.slice(1).replace(/[^\d]/g, '').slice(0, 12)
                          setPhone('+' + digits)
                        } else {
                          // Allow only digits, max 10 (will be formatted to +91 later)
                          const digits = value.replace(/[^\d]/g, '').slice(0, 10)
                          setPhone(digits)
                        }
                      }}
                      placeholder="+91 9876543210"
                      className="h-12 text-lg"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t('login.phone_instruction')}
                    </p>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                    disabled={isLoading || !phone || (phone.length < 10 && !phone.startsWith('+'))}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('login.sending_otp')}
                      </>
                    ) : (
                        t('login.send_otp')
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOTPSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                      {t('login.verification_code')}
                    </label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder={t('login.verification_code')}
                      className="h-12 text-lg text-center tracking-widest"
                      maxLength={4}
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                      disabled={isLoading || otp.length !== 4}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t('login.verifying')}
                        </>
                      ) : (
                        t('login.verify_otp_btn')
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBackToPhone}
                      className="w-full text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t('login.back_to_phone')}
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center">
                <Link 
                  href="/" 
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  {t('login.back_to_home')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
