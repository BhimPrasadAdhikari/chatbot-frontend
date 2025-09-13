"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  phone: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (phone: string) => Promise<void>
  verifyOTP: (otp: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('krishi-sathi-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('krishi-sathi-user')
      }
    }
  }, [])

  const login = async (phone: string) => {
    setIsLoading(true)
    try {
      // Send OTP to phone number
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })

      if (!response.ok) {
        throw new Error('Failed to send OTP')
      }

      // Store phone number temporarily
      const tempUser = { phone, isVerified: false }
      setUser(tempUser)
      localStorage.setItem('krishi-sathi-user', JSON.stringify(tempUser))
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async (otp: string): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: user.phone, otp }),
      })

      if (response.ok) {
        const verifiedUser = { ...user, isVerified: true }
        setUser(verifiedUser)
        localStorage.setItem('krishi-sathi-user', JSON.stringify(verifiedUser))
        // Small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 50))
        return true
      }
      return false
    } catch (error) {
      console.error('OTP verification error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('krishi-sathi-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, verifyOTP, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
