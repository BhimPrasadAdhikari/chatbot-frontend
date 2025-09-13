import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone number and OTP are required' }, { status: 400 })
    }

    // Get stored session ID
    const otpStore = (global as any).otpStore || new Map()
    
    // Normalize phone number format to match what was stored
    let normalizedPhone = phone;
    if (phone.startsWith('91')) {
      normalizedPhone = '+' + phone;
    } else if (!phone.startsWith('+91')) {
      normalizedPhone = '+91' + phone;
    }
    
    console.log('Verify OTP - Phone received:', phone);
    console.log('Verify OTP - Normalized phone:', normalizedPhone);
    console.log('Verify OTP - Available keys in store:', Array.from(otpStore.keys()));
    
    const storedData = otpStore.get(normalizedPhone)

    if (!storedData || !storedData.sessionId) {
      return NextResponse.json({ error: 'OTP session not found or expired' }, { status: 400 })
    }

    // Check if OTP is expired (5 minutes)
    const now = Date.now()
    const otpAge = now - storedData.timestamp
    const fiveMinutes = 5 * 60 * 1000

    if (otpAge > fiveMinutes) {
      otpStore.delete(normalizedPhone)
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
    }

    // Verify OTP using 2Factor API
    const apiKey = process.env.TWO_FACTOR_API_KEY;
    const baseUrl = process.env.TWO_FACTOR_BASE_URL || 'https://2factor.in/API/V1';

    const response = await fetch(
      `${baseUrl}/${apiKey}/SMS/VERIFY/${storedData.sessionId}/${otp}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    console.log('2Factor Verify API Response:', data);

    if (data.Status === 'Success') {
      // OTP is valid, remove it from store
      otpStore.delete(normalizedPhone)
      return NextResponse.json({ message: 'OTP verified successfully' })
    } else {
      return NextResponse.json({ error: data.Details || 'Invalid OTP' }, { status: 400 })
    }
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}
