# Krishi Sathi - Authentication Setup Guide

## Environment Variables Setup

To enable OTP functionality, you need to set up the following environment variables:

### 1. Create `.env.local` file in your project root:

```env
# 2Factor API Configuration
TWO_FACTOR_API_KEY=your_2factor_api_key_here
TWO_FACTOR_BASE_URL=https://2factor.in/API
TWO_FACTOR_OTP_TEMPLATE_NAME=your_template_name_here

# Personal API URLs (Optional - will use default URLs if not set)
NEXT_PUBLIC_DISEASE_API_URL=https://your-disease-api-url.com/predict
NEXT_PUBLIC_CHATBOT_API_URL=https://your-chatbot-api-url.com/chat
```

### 2. Get 2Factor API Credentials:

1. Visit [2Factor.in](https://2factor.in/)
2. Sign up for an account
3. Get your API key from the dashboard
4. Create an OTP template and note the template name
5. Replace the placeholder values in `.env.local`

### 3. Personal API Configuration (Optional):

If you have your own APIs for disease analysis and chatbot functionality:

1. Set `NEXT_PUBLIC_DISEASE_API_URL` to your disease analysis API endpoint
2. Set `NEXT_PUBLIC_CHATBOT_API_URL` to your chatbot API endpoint
3. If not set, the app will use the default APIs

**Note**: These environment variables use `NEXT_PUBLIC_` prefix because they need to be accessible in the browser.

### 4. Development Mode:

If you don't have 2Factor API credentials yet, the app will work in development mode:
- OTP codes will be logged to the console instead of being sent via SMS
- You can use any 6-digit code for testing
- The system will show a yellow banner indicating development mode

### 5. Testing the Authentication:

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Enter any 10-digit phone number
4. In development mode, check the console for the OTP code
5. Enter the OTP code to complete authentication
6. You'll be redirected to `/chatbot` upon successful verification

### 6. Production Deployment:

For production, make sure to:
- Set up proper 2Factor API credentials
- Use a secure OTP storage solution (Redis recommended)
- Set `NODE_ENV=production`

## Features Implemented:

✅ Phone number authentication  
✅ OTP verification  
✅ Route protection for `/chatbot`  
✅ User session management  
✅ Beautiful login UI with `main.jpg` background  
✅ Navbar integration with user phone display  
✅ Logout functionality  
✅ Development mode support  

## File Structure:

```
├── contexts/auth-context.tsx          # Authentication state management
├── app/api/send-otp/route.ts         # OTP sending endpoint
├── app/api/verify-otp/route.ts       # OTP verification endpoint
├── app/login/page.tsx                # Login page with phone auth
├── components/navbar.tsx             # Updated navbar with auth
├── components/protected-route.tsx    # Route protection component
└── app/chatbot/page.tsx              # Protected chatbot page
```
