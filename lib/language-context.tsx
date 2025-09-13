"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "english" | "malayalam"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  english: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About", 
    "nav.features": "Features",
    "nav.contact": "Contact",
    "nav.login": "Login",
    
    // Login Page
    "login.enter_phone": "Enter Your Phone Number",
    "login.verify_otp": "Verify OTP",
    "login.phone_description": "We'll send you a verification code to authenticate your account",
    "login.phone_instruction": "Enter with +91 or just 10 digits (e.g., +91 9876543210 or 9876543210)",
    "login.otp_description": "Enter the 6-digit code sent to",
    "login.phone_number": "Phone Number",
    "login.verification_code": "Verification Code",
    "login.send_otp": "Send OTP",
    "login.verify_otp_btn": "Verify OTP",
    "login.back_to_phone": "Back to Phone Number",
    "login.back_to_home": "Back to Home",
    "login.sending_otp": "Sending OTP...",
    "login.verifying": "Verifying...",
    "login.invalid_phone": "Please enter a valid phone number (+91 9876543210)",
    "login.invalid_otp": "Please enter a valid 4-digit OTP",
    "login.failed_send": "Failed to send OTP. Please try again.",
    "login.failed_verify": "Invalid OTP. Please try again.",
    "nav.switch_to_malayalam": "മലയാളം",
    "nav.switch_to_english": "English",
    "nav.switch_to_malayalam_mobile": "Switch to മലയാളം",
    "nav.switch_to_english_mobile": "Switch to English",

    // Hero Section
    "hero.title": "Empowering Farmers with AI-Driven Agriculture",
    "hero.subtitle": "Your Digital Krishi Officer for Smart Farming Solutions",
    "hero.description": "Get instant guidance on crop diseases, weather forecasts, and government schemes. Available in multiple Indian languages.",
    "hero.get_started": "Get Started",
    "hero.learn_more": "Learn More",

    // Service Cards
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive agricultural solutions powered by AI",
    "services.disease_detection": "Disease Detection & Plant Health",
    "services.disease_detection_desc": "AI-powered plant health checkup",
    "services.digital_officer": "Digital Krishi Officer",
    "services.digital_officer_desc": "LLM-powered chatbot for instant solutions",
    "services.weather_forecast": "Smart Weather Forecast",
    "services.weather_forecast_desc": "Live weather updates for your location",
    "services.ask_now": "Ask Now",
    "services.explore_data": "Explore Data",
    "services.disease_feature1": "Image-based disease and pest identification",
    "services.disease_feature2": "Tailored treatment and dosage recommendations",
    "services.disease_feature3": "Real-time monitoring",
    "services.officer_feature1": "Multilingual support (English, Hindi, Malayalam, regional languages)",
    "services.officer_feature2": "Farmers can ask via text, voice, or crop images",
    "services.officer_feature3": "24/7 assistance",
    "services.weather_feature1": "Rainfall and temperature predictions",
    "services.weather_feature2": "Personalized sowing and irrigation guidance",
    "services.weather_feature3": "Crop-specific weather alerts",
    "services.govt_schemes": "Government Schemes",
    "services.govt_schemes_desc": "Information about agricultural subsidies, loans, and government programs.",
    "services.expert_consultation": "Expert Consultation",
    "services.expert_consultation_desc": "Connect with agricultural experts for personalized farming advice.",

    // Blog Carousel
    "blog.title": "Daily Blogs For Farmers",
    "blog.subtitle": "Stay updated with the latest insights, tips, and innovations in modern agriculture.",
    "blog.read_more": "Read More",

    // Government Schemes
    "schemes.title": "Government Schemes",
    "schemes.subtitle": "Access information about agricultural subsidies and government programs",
    "schemes.view_all": "View All Schemes",
    "schemes.eligibility": "Eligibility",
    "schemes.learn_more": "Learn More",
    "schemes.pm_kisan.title": "PM-KISAN Scheme",
    "schemes.pm_kisan.description": "Direct income support of ₹6,000 per year to farmer families",
    "schemes.pm_kisan.eligibility": "All landholding farmer families",
    "schemes.pm_kisan.amount": "₹6,000/year",
    "schemes.crop_insurance.title": "Crop Insurance Scheme",
    "schemes.crop_insurance.description": "Comprehensive risk solution for crop loss due to natural calamities",
    "schemes.crop_insurance.eligibility": "All farmers growing notified crops",
    "schemes.crop_insurance.amount": "Up to ₹2 lakh",
    "schemes.soil_health.title": "Soil Health Card Scheme",
    "schemes.soil_health.description": "Free soil testing and nutrient management recommendations",
    "schemes.soil_health.eligibility": "All farmers with agricultural land",
    "schemes.soil_health.amount": "Free service",

    // Footer
    "footer.about": "About",
    "footer.services": "Services",
    "footer.support": "Support",
    "footer.legal": "Legal",
    "footer.contact_info": "Contact Information",
    "footer.follow_us": "Follow Us",
    "footer.copyright": "© 2024 Krishi-Sathi. All rights reserved.",
    "footer.description": "Empowering farmers with modern technology and sustainable practices for a better tomorrow.",
    "footer.blog": "Blog",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_desc": "Subscribe to get the latest updates on farming techniques and government schemes.",
    "footer.email_placeholder": "Enter your email",
    "footer.subscribe": "Subscribe",
    "footer.privacy_policy": "Privacy Policy",
    "footer.terms_of_service": "Terms of Service",
    "footer.cookie_policy": "Cookie Policy",

    // About Section
    "about.title": "About Krishi-Sathi",
    "about.intro": "Krishi-Sathi (Digital Krishi Officer of Kerala) is an intelligent agricultural assistant designed to empower farmers with real-time guidance, multilingual support, and smart technology. By integrating AI-powered insights with government services, Krishi-Sathi bridges the gap between farmers and modern digital agriculture.",
    "about.core_features": "Core Features:",
    "about.pest_detection": "Pest & Disease Detection:",
    "about.pest_detection_desc": "image recognition and dosage tools to detect and solve crop issues.",
    "about.weather_advisory": "Weather Advisory:",
    "about.weather_advisory_desc": "weather forecasts, rainfall alerts, and crop-specific tips.",
    "about.gov_integration": "Government Integration:",
    "about.gov_integration_desc": "Automates routine queries for Agriculture Department & Krishibhavans.",
    "about.mission_statement": "Mission Statement",
    "about.mission_desc": "To provide every farmer with a digital companion that simplifies agriculture through AI, real-time insights, and government integration — making farming smarter, sustainable, and more profitable.",
    "about.learn_more": "Learn More",

    // Policy Section
    "policy.title": "Krishi-Sathi",
    "policy.description": "Krishisathi seamlessly integrates with government systems to provide farmers instant access to schemes, subsidies, and official agricultural guidance while reducing the burden on government helplines.",
    "policy.automates_queries": "Automates routine queries for Agriculture Department & Krishibhavans",
    "policy.seamless_integration": "Seamless integration with government scheme databases",
    "policy.reduces_workload": "Reduces workload on agricultural helplines and officers",
    "policy.standardized_info": "Provides standardized, accurate information across regions",
    "policy.data_driven_decisions": "Enables data-driven policy decisions through farmer feedback",
    "policy.krishibhavans": "Krishibhavans",
    "policy.query_resolution": "Query Resolution",
    "policy.availability": "Availability",

    // Weather Dashboard
    "weather.title": "Kerala Weather Dashboard",
    "weather.subtitle": "Real-time weather information for farmers across Kerala districts",
    "weather.selectDistrict": "Select District",
    "weather.refresh": "Refresh",
    "weather.loading": "Loading weather data...",
    "weather.temperature": "Temperature",
    "weather.humidity": "Humidity",
    "weather.windSpeed": "Wind Speed",
    "weather.farmingAdvice": "Farming Advice",
    "weather.weeklyForecast": "7-Day Forecast",
    "weather.temperatureForecast": "24-Hour Temperature Forecast",
    "weather.humidityForecast": "24-Hour Humidity Forecast",
    "weather.windForecast": "24-Hour Wind Speed Forecast",
    "weather.currentConditions": "Current Conditions",
    "weather.weeklyOutlook": "Weekly Outlook for",
    "weather.high": "High",
    "weather.low": "Low",
    "weather.rain": "Rain",
    "weather.wind": "Wind",
    "weather.switchToMalayalam": "മലയാളം",
    "weather.switchToEnglish": "English",

    // Common keywords
    "keywords.ai_powered": "AI-powered",
    "keywords.real_time": "real-time",
    "keywords.sustainable": "sustainable",
    "keywords.ai": "AI",
  },
  malayalam: {
    // Navbar
    "nav.home": "ഹോം",
    "nav.about": "കുറിച്ച്",
    "nav.features": "സവിശേഷതകൾ", 
    "nav.contact": "ബന്ധപ്പെടുക",
    "nav.login": "ലോഗിൻ",
    
    // Login Page
    "login.enter_phone": "നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക",
    "login.verify_otp": "OTP പരിശോധിക്കുക",
    "login.phone_description": "നിങ്ങളുടെ അക്കൗണ്ട് പരിശോധിക്കാൻ ഞങ്ങൾ ഒരു പരിശോധന കോഡ് അയയ്ക്കും",
    "login.phone_instruction": "+91 ഉപയോഗിച്ച് അല്ലെങ്കിൽ 10 അക്കങ്ങൾ മാത്രം നൽകുക (ഉദാ: +91 9876543210 അല്ലെങ്കിൽ 9876543210)",
    "login.otp_description": "അയച്ച 6 അക്ക കോഡ് നൽകുക",
    "login.phone_number": "ഫോൺ നമ്പർ",
    "login.verification_code": "പരിശോധന കോഡ്",
    "login.send_otp": "OTP അയയ്ക്കുക",
    "login.verify_otp_btn": "OTP പരിശോധിക്കുക",
    "login.back_to_phone": "ഫോൺ നമ്പറിലേക്ക് തിരികെ",
    "login.back_to_home": "ഹോമിലേക്ക് തിരികെ",
    "login.sending_otp": "OTP അയയ്ക്കുന്നു...",
    "login.verifying": "പരിശോധിക്കുന്നു...",
    "login.invalid_phone": "ദയവായി സാധുവായ ഫോൺ നമ്പർ നൽകുക (+91 9876543210)",
    "login.invalid_otp": "ദയവായി സാധുവായ 4 അക്ക OTP നൽകുക",
    "login.failed_send": "OTP അയയ്ക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    "login.failed_verify": "സാധുവല്ലാത്ത OTP. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    "nav.switch_to_malayalam": "മലയാളം",
    "nav.switch_to_english": "English",
    "nav.switch_to_malayalam_mobile": "Switch to മലയാളം",
    "nav.switch_to_english_mobile": "Switch to English",

    // Hero Section
    "hero.title": "AI-ചാലിത കാർഷികതയുമായി കർഷകരെ ശാക്തീകരിക്കുന്നു",
    "hero.subtitle": "സ്മാർട്ട് കാർഷിക പരിഹാരങ്ങൾക്കായി നിങ്ങളുടെ ഡിജിറ്റൽ കൃഷി ഉദ്യോഗസ്ഥൻ",
    "hero.description": "വിള രോഗങ്ങൾ, കാലാവസ്ഥാ പ്രവചനങ്ങൾ, സർക്കാർ പദ്ധതികൾ എന്നിവയെക്കുറിച്ച് തൽക്ഷണ മാർഗദർശനം നേടുക. ഒന്നിലധികം ഇന്ത്യൻ ഭാഷകളിൽ ലഭ്യമാണ്.",
    "hero.get_started": "ആരംഭിക്കുക",
    "hero.learn_more": "കൂടുതൽ അറിയുക",

    // Service Cards
    "services.title": "ഞങ്ങളുടെ സേവനങ്ങൾ",
    "services.subtitle": "AI-ചാലിത സമഗ്ര കാർഷിക പരിഹാരങ്ങൾ",
    "services.disease_detection": "രോഗ കണ്ടെത്തൽ & സസ്യാരോഗ്യം",
    "services.disease_detection_desc": "AI-ചാലിത സസ്യാരോഗ്യ പരിശോധന",
    "services.digital_officer": "ഡിജിറ്റൽ കൃഷി ഉദ്യോഗസ്ഥൻ",
    "services.digital_officer_desc": "തൽക്ഷണ പരിഹാരങ്ങൾക്കായി LLM-ചാലിത ചാറ്റ്ബോട്ട്",
    "services.weather_forecast": "സ്മാർട്ട് കാലാവസ്ഥാ പ്രവചനം",
    "services.weather_forecast_desc": "നിങ്ങളുടെ സ്ഥാനത്തിനായി തത്സമയ കാലാവസ്ഥാ അപ്ഡേറ്റുകൾ",
    "services.ask_now": "ഇപ്പോൾ ചോദിക്കുക",
    "services.explore_data": "ഡാറ്റ പര്യവേക്ഷണം ചെയ്യുക",
    "services.disease_feature1": "ചിത്ര-അടിസ്ഥാന രോഗ, കീട കണ്ടെത്തൽ",
    "services.disease_feature2": "അനുയോജ്യമായ ചികിത്സാ, ഡോസേജ് ശുപാർശകൾ",
    "services.disease_feature3": "റിയൽ-ടൈം നിരീക്ഷണം",
    "services.officer_feature1": "ബഹുഭാഷാ പിന്തുണ (ഇംഗ്ലീഷ്, ഹിന്ദി, മലയാളം, പ്രാദേശിക ഭാഷകൾ)",
    "services.officer_feature2": "കർഷകർക്ക് ടെക്സ്റ്റ്, വോയ്സ്, വിള ചിത്രങ്ങൾ വഴി ചോദിക്കാം",
    "services.officer_feature3": "24/7 സഹായം",
    "services.weather_feature1": "മഴ, താപനില പ്രവചനങ്ങൾ",
    "services.weather_feature2": "വ്യക്തിഗത വിത്തിടൽ, ജലസേചന മാർഗദർശനം",
    "services.weather_feature3": "വിള-നിർദ്ദിഷ്ട കാലാവസ്ഥാ അലേർട്ടുകൾ",
    "services.govt_schemes": "സർക്കാർ പദ്ധതികൾ",
    "services.govt_schemes_desc": "കാർഷിക സബ്സിഡികൾ, വായ്പകൾ, സർക്കാർ പരിപാടികൾ എന്നിവയെക്കുറിച്ചുള്ള വിവരങ്ങൾ.",
    "services.expert_consultation": "വിദഗ്ധ ഉപദേശം",
    "services.expert_consultation_desc": "വ്യക്തിഗത കാർഷിക ഉപദേശത്തിനായി കാർഷിക വിദഗ്ധരുമായി ബന്ധപ്പെടുക.",

    // Blog Carousel
    "blog.title": "കർഷകർക്കായുള്ള ദൈനംദിന ബ്ലോഗുകൾ",
    "blog.subtitle": "ആധുനിക കാർഷികതയിലെ ഏറ്റവും പുതിയ ഉൾക്കാഴ്ചകൾ, നുറുങ്ങുകൾ, നവീകരണങ്ങൾ എന്നിവയുമായി അപ്ഡേറ്റ് ആയിരിക്കുക.",
    "blog.read_more": "കൂടുതൽ വായിക്കുക",

    // Government Schemes
    "schemes.title": "സർക്കാർ പദ്ധതികൾ",
    "schemes.subtitle": "കാർഷിക സബ്സിഡികളും സർക്കാർ പരിപാടികളും സംബന്ധിച്ച വിവരങ്ങൾ നേടുക",
    "schemes.view_all": "എല്ലാ പദ്ധതികളും കാണുക",
    "schemes.eligibility": "യോഗ്യത",
    "schemes.learn_more": "കൂടുതൽ അറിയുക",
    "schemes.pm_kisan.title": "പിഎം-കിസാൻ പദ്ധതി",
    "schemes.pm_kisan.description": "കർഷക കുടുംബങ്ങൾക്ക് വർഷത്തിൽ ₹6,000 നേരിട്ടുള്ള വരുമാന പിന്തുണ",
    "schemes.pm_kisan.eligibility": "എല്ലാ ഭൂമി ഉടമസ്ഥ കർഷക കുടുംബങ്ങളും",
    "schemes.pm_kisan.amount": "₹6,000/വർഷം",
    "schemes.crop_insurance.title": "വിള ഇൻഷുറൻസ് പദ്ധതി",
    "schemes.crop_insurance.description": "പ്രകൃതി ദുരന്തങ്ങൾ കാരണം വിള നഷ്ടത്തിനുള്ള സമഗ്ര അപകടസാധ്യത പരിഹാരം",
    "schemes.crop_insurance.eligibility": "അറിയിപ്പ് നൽകിയ വിളകൾ വളർത്തുന്ന എല്ലാ കർഷകരും",
    "schemes.crop_insurance.amount": "₹2 ലക്ഷം വരെ",
    "schemes.soil_health.title": "മണ്ണ് ആരോഗ്യ കാർഡ് പദ്ധതി",
    "schemes.soil_health.description": "സൗജന്യ മണ്ണ് പരിശോധനയും പോഷക മാനേജ്മെന്റ് ശുപാർശകളും",
    "schemes.soil_health.eligibility": "കാർഷിക ഭൂമി ഉള്ള എല്ലാ കർഷകരും",
    "schemes.soil_health.amount": "സൗജന്യ സേവനം",

    // Footer
    "footer.about": "കുറിച്ച്",
    "footer.services": "സേവനങ്ങൾ",
    "footer.support": "പിന്തുണ",
    "footer.legal": "നിയമപരമായ",
    "footer.contact_info": "ബന്ധപ്പെടൽ വിവരങ്ങൾ",
    "footer.follow_us": "ഞങ്ങളെ പിന്തുടരുക",
    "footer.copyright": "© 2024 കൃഷിസാഥി. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തമാണ്.",
    "footer.description": "നാളെയുടെ ഉത്തമതയ്ക്കായി ആധുനിക സാങ്കേതികവിദ്യയും സുസ്ഥിര പ്രവർത്തനങ്ങളും ഉപയോഗിച്ച് കർഷകരെ ശാക്തീകരിക്കുന്നു.",
    "footer.blog": "ബ്ലോഗ്",
    "footer.newsletter": "വാർത്താക്കുറിപ്പ്",
    "footer.newsletter_desc": "കാർഷിക സാങ്കേതികവിദ്യകളും സർക്കാർ പദ്ധതികളും സംബന്ധിച്ച ഏറ്റവും പുതിയ അപ്ഡേറ്റുകൾ നേടാൻ സബ്സ്ക്രൈബ് ചെയ്യുക.",
    "footer.email_placeholder": "നിങ്ങളുടെ ഇമെയിൽ നൽകുക",
    "footer.subscribe": "സബ്സ്ക്രൈബ് ചെയ്യുക",
    "footer.privacy_policy": "സ്വകാര്യതാ നയം",
    "footer.terms_of_service": "സേവന നിബന്ധനകൾ",
    "footer.cookie_policy": "കുക്കി നയം",

    // About Section
    "about.title": "കൃഷിസാഥി കുറിച്ച്",
    "about.intro": "കൃഷിസാഥി (കേരളത്തിന്റെ ഡിജിറ്റൽ കൃഷി ഉദ്യോഗസ്ഥൻ) കർഷകരെ റിയൽ-ടൈം മാർഗദർശനം, ബഹുഭാഷാ പിന്തുണ, സ്മാർട്ട് സാങ്കേതികവിദ്യ എന്നിവയുമായി ശാക്തീകരിക്കാൻ രൂപകൽപ്പന ചെയ്ത ബുദ്ധിമാനായ കാർഷിക സഹായി. സർക്കാർ സേവനങ്ങളുമായി AI-ചാലിത ഉൾക്കാഴ്ചകൾ സംയോജിപ്പിക്കുന്നതിലൂടെ, കൃഷിസാഥി കർഷകരും ആധുനിക ഡിജിറ്റൽ കാർഷികതയും തമ്മിലുള്ള വിടവ് കുറയ്ക്കുന്നു.",
    "about.core_features": "മുഖ്യ സവിശേഷതകൾ:",
    "about.pest_detection": "കീടങ്ങളും രോഗങ്ങളും കണ്ടെത്തൽ:",
    "about.pest_detection_desc": "വിള പ്രശ്നങ്ങൾ കണ്ടെത്താനും പരിഹരിക്കാനും AI-ചാലിത ചിത്ര തിരിച്ചറിയൽ, ഡോസേജ് ഉപകരണങ്ങൾ.",
    "about.weather_advisory": "കാലാവസ്ഥാ ഉപദേശം:",
    "about.weather_advisory_desc": "റിയൽ-ടൈം കാലാവസ്ഥാ പ്രവചനങ്ങൾ, മഴ അലേർട്ടുകൾ, വിള-നിർദ്ദിഷ്ട നുറുങ്ങുകൾ.",
    "about.gov_integration": "സർക്കാർ സംയോജനം:",
    "about.gov_integration_desc": "കാർഷിക വകുപ്പിനും കൃഷിഭവനങ്ങൾക്കും റൂട്ടിൻ ചോദ്യങ്ങൾ ഓട്ടോമേറ്റ് ചെയ്യുന്നു.",
    "about.mission_statement": "മിഷൻ പ്രസ്താവന",
    "about.mission_desc": "AI, റിയൽ-ടൈം ഉൾക്കാഴ്ചകൾ, സർക്കാർ സംയോജനം എന്നിവയിലൂടെ കാർഷികത ലളിതമാക്കുന്ന ഡിജിറ്റൽ കൂട്ടാളിയെ എല്ലാ കർഷകർക്കും നൽകാൻ — കാർഷികതയെ സ്മാർട്ട്, സുസ്ഥിരവും കൂടുതൽ ലാഭകരവുമാക്കാൻ.",
    "about.learn_more": "കൂടുതൽ അറിയുക",

    // Policy Section
    "policy.title": "കൃഷിസാഥി",
    "policy.description": "കൃഷിസാഥി സർക്കാർ സിസ്റ്റങ്ങളുമായി നിരന്തരമായി സംയോജിപ്പിക്കുന്നു, കർഷകർക്ക് പദ്ധതികൾ, സബ്സിഡികൾ, ഔദ്യോഗിക കാർഷിക മാർഗദർശനം എന്നിവയിലേക്ക് തൽക്ഷണ പ്രവേശനം നൽകുകയും സർക്കാർ ഹെൽപ്ലൈനുകളിലെ ഭാരം കുറയ്ക്കുകയും ചെയ്യുന്നു.",
    "policy.automates_queries": "കാർഷിക വകുപ്പിനും കൃഷിഭവനങ്ങൾക്കും റൂട്ടിൻ ചോദ്യങ്ങൾ ഓട്ടോമേറ്റ് ചെയ്യുന്നു",
    "policy.seamless_integration": "സർക്കാർ പദ്ധതി ഡാറ്റാബേസുകളുമായി നിരന്തരമായ സംയോജനം",
    "policy.reduces_workload": "കാർഷിക ഹെൽപ്ലൈനുകളുടെയും ഉദ്യോഗസ്ഥരുടെയും ജോലിഭാരം കുറയ്ക്കുന്നു",
    "policy.standardized_info": "പ്രദേശങ്ങളിലുടനീളം സാധാരണവൽക്കരിച്ച, കൃത്യമായ വിവരങ്ങൾ നൽകുന്നു",
    "policy.data_driven_decisions": "കർഷക പ്രതികരണങ്ങളിലൂടെ ഡാറ്റ-ചാലിത നയ തീരുമാനങ്ങൾ സാധ്യമാക്കുന്നു",
    "policy.krishibhavans": "കൃഷിഭവനങ്ങൾ",
    "policy.query_resolution": "ചോദ്യ പരിഹാരം",
    "policy.availability": "ലഭ്യത",

    // Weather Dashboard
    "weather.title": "കേരള കാലാവസ്ഥാ ഡാഷ്ബോർഡ്",
    "weather.subtitle": "കേരള ജില്ലകളിലുടനീളം കർഷകർക്കായി തത്സമയ കാലാവസ്ഥാ വിവരങ്ങൾ",
    "weather.selectDistrict": "ജില്ല തിരഞ്ഞെടുക്കുക",
    "weather.refresh": "പുതുക്കുക",
    "weather.loading": "കാലാവസ്ഥാ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...",
    "weather.temperature": "താപനില",
    "weather.humidity": "ആർദ്രത",
    "weather.windSpeed": "കാറ്റിന്റെ വേഗത",
    "weather.farmingAdvice": "കാർഷിക ഉപദേശം",
    "weather.weeklyForecast": "7 ദിവസത്തെ പ്രവചനം",
    "weather.temperatureForecast": "24 മണിക്കൂർ താപനില പ്രവചനം",
    "weather.humidityForecast": "24 മണിക്കൂർ ആർദ്രത പ്രവചനം",
    "weather.windForecast": "24 മണിക്കൂർ കാറ്റിന്റെ വേഗത പ്രവചനം",
    "weather.currentConditions": "നിലവിലെ അവസ്ഥകൾ",
    "weather.weeklyOutlook": "ആഴ്ചയിലെ കാഴ്ച",
    "weather.high": "ഉയർന്ന",
    "weather.low": "താഴ്ന്ന",
    "weather.rain": "മഴ",
    "weather.wind": "കാറ്റ്",
    "weather.switchToMalayalam": "മലയാളം",
    "weather.switchToEnglish": "English",

    // Common keywords
    "keywords.ai_powered": "AI-ചാലിത",
    "keywords.real_time": "റിയൽ-ടൈം",
    "keywords.sustainable": "സുസ്ഥിര",
    "keywords.ai": "AI",
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("english")

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language
    if (savedLanguage && (savedLanguage === 'english' || savedLanguage === 'malayalam')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    // Save language to localStorage
    localStorage.setItem('selectedLanguage', newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.english] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
