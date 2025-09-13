import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Validate phone number format (accepts +91 prefix)
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Store OTP session temporarily (in production, use Redis or database)
    // For now, we'll use a simple in-memory store
    const otpStore = (global as any).otpStore || new Map()

    const apiKey = process.env.TWO_FACTOR_API_KEY;
    const baseUrl = process.env.TWO_FACTOR_BASE_URL || 'https://2factor.in/API/V1';
    const otpTemplate = process.env.TWO_FACTOR_OTP_TEMPLATE_NAME || 'OTP1';

    // Debug logging
    console.log('Environment variables check:');
    console.log('TWO_FACTOR_API_KEY:', apiKey ? 'Set' : 'Not set');
    console.log('TWO_FACTOR_BASE_URL:', baseUrl);
    console.log('TWO_FACTOR_OTP_TEMPLATE_NAME:', otpTemplate);

    if (!apiKey) {
      return NextResponse.json(
        { error: 'TwoFactor API key not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    // Format phone number (ensure it starts with +91 for 2Factor API)
    let formattedPhone = phone;
    if (phone.startsWith('91')) {
      formattedPhone = '+' + phone;
    } else if (!phone.startsWith('+91')) {
      formattedPhone = '+91' + phone;
    }

    console.log('Phone number processing:');
    console.log('Original phone:', phone);
    console.log('Formatted phone:', formattedPhone);

    // Send OTP using 2Factor API
    const response = await fetch(
      `${baseUrl}/${apiKey}/SMS/${encodeURIComponent(formattedPhone)}/AUTOGEN3/${otpTemplate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    console.log('2Factor API Response:', data);

    if (data.Status === 'Success') {
      // Store session ID for verification
      const sessionId = data.Details;
      // Use the formatted phone number as the key for consistency
      otpStore.set(formattedPhone, { sessionId, timestamp: Date.now() });
      (global as any).otpStore = otpStore;

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        sessionId: sessionId,
      });
    } else {
      return NextResponse.json(
        { error: data.Details || 'Failed to send OTP' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
