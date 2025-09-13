"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Cloud, Sun, Droplets, Wind, Thermometer, Eye, RefreshCw } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

interface District {
  name: string
  hq: string
  latitude: number
  longitude: number
}

interface WeatherData {
  current: {
    time: string
    temperature_2m: number
    wind_speed_10m: number
    relative_humidity_2m?: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
    wind_speed_10m_max: number[]
  }
}

const districts: District[] = [
  { name: "Thiruvananthapuram", hq: "Thiruvananthapuram", latitude: 8.5241, longitude: 76.9366 },
  { name: "Kollam", hq: "Kollam", latitude: 8.8932, longitude: 76.6141 },
  { name: "Pathanamthitta", hq: "Pathanamthitta", latitude: 9.2640, longitude: 76.7870 },
  { name: "Alappuzha", hq: "Alappuzha", latitude: 9.4981, longitude: 76.3388 },
  { name: "Kottayam", hq: "Kottayam", latitude: 9.5916, longitude: 76.5222 },
  { name: "Idukki", hq: "Painavu (Idukki)", latitude: 9.8495, longitude: 76.9784 },
  { name: "Ernakulam", hq: "Kakkanad (Ernakulam/Kochi)", latitude: 10.0480, longitude: 76.3277 },
  { name: "Thrissur", hq: "Thrissur", latitude: 10.5276, longitude: 76.2144 },
  { name: "Palakkad", hq: "Palakkad", latitude: 10.7867, longitude: 76.6548 },
  { name: "Malappuram", hq: "Malappuram", latitude: 11.0734, longitude: 76.0740 },
  { name: "Kozhikode", hq: "Kozhikode", latitude: 11.2588, longitude: 75.7804 },
  { name: "Wayanad", hq: "Kalpetta", latitude: 11.6102, longitude: 76.0824 },
  { name: "Kannur", hq: "Kannur", latitude: 11.8745, longitude: 75.3704 },
  { name: "Kasaragod", hq: "Kasaragod", latitude: 12.4996, longitude: 74.9869 }
]

export default function WeatherDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState<District>(districts[0])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const { language, t: globalT } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()

  // Check if component is mounted on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (isClient && (!user || !user.isVerified)) {
      router.push('/login')
    }
  }, [isClient, user, router])

  // Debug: Log current language when component mounts
  useEffect(() => {
    console.log('Weather Dashboard: Current language is', language)
  }, [language])

  // Use global language context instead of local translations

  const fetchWeatherData = async (district: District) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${district.latitude}&longitude=${district.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Asia/Kolkata&forecast_days=7`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError('Failed to load weather data. Please try again.')
      console.error('Weather fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData(selectedDistrict)
  }, [selectedDistrict])

  const getTemperatureColor = (temp: number) => {
    if (temp < 20) return 'text-blue-800'
    if (temp < 30) return 'text-green-800'
    if (temp < 35) return 'text-orange-600'
    return 'text-red-800'
  }

  const getHumidityColor = (humidity: number) => {
    if (humidity < 40) return 'text-red-800'
    if (humidity < 70) return 'text-orange-600'
    return 'text-green-800'
  }

  const getWindSpeedColor = (speed: number) => {
    if (speed < 10) return 'text-green-800'
    if (speed < 20) return 'text-orange-600'
    return 'text-red-800'
  }

  const getFarmingAdvice = (weather: WeatherData) => {
    const temp = weather.current.temperature_2m
    const humidity = weather.current.relative_humidity_2m || 0
    const wind = weather.current.wind_speed_10m

    if (language === 'malayalam') {
      if (temp > 35) {
        return `🌡️ ഉയർന്ന താപനില (${temp}°C) - വിളകൾക്ക് ജലസേചനവും നിഴലും പരിഗണിക്കുക`
      } else if (temp < 20) {
        return `❄️ തണുത്ത കാലാവസ്ഥ (${temp}°C) - വേരുകൾക്കും ഇലക്കറികൾക്കും നല്ലത്`
      } else if (humidity > 80) {
        return `💧 ഉയർന്ന ആർദ്രത (${humidity}%) - ഫംഗസ് രോഗങ്ങൾ നിരീക്ഷിക്കുക, നല്ല വായുസഞ്ചാരം ഉറപ്പാക്കുക`
      } else if (wind > 15) {
        return `💨 ശക്തമായ കാറ്റ് (${wind} km/h) - ചെറുചെടികൾ സംരക്ഷിക്കുക, ജലസേചന സംവിധാനങ്ങൾ പരിശോധിക്കുക`
      } else {
        return `🌱 മിക്ക വിളകൾക്കും അനുകൂലമായ അവസ്ഥ (${temp}°C, ${humidity}% ആർദ്രത)`
      }
    } else {
      if (temp > 35) {
        return `🌡️ High temperature (${temp}°C) - Consider irrigation and shade for crops`
      } else if (temp < 20) {
        return `❄️ Cool weather (${temp}°C) - Good for root vegetables and leafy greens`
      } else if (humidity > 80) {
        return `💧 High humidity (${humidity}%) - Watch for fungal diseases, ensure good ventilation`
      } else if (wind > 15) {
        return `💨 Strong winds (${wind} km/h) - Protect young plants and check irrigation systems`
      } else {
        return `🌱 Favorable conditions (${temp}°C, ${humidity}% humidity) for most crops`
      }
    }
  }

  const prepareChartData = () => {
    if (!weatherData) return []
    
    return weatherData.hourly.time.slice(0, 24).map((time, index) => ({
      time: new Date(time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      temperature: weatherData.hourly.temperature_2m[index],
      humidity: weatherData.hourly.relative_humidity_2m[index],
      wind: weatherData.hourly.wind_speed_10m[index]
    }))
  }

  const prepareWeeklyData = () => {
    if (!weatherData) return []
    
    return weatherData.daily.time.map((time, index) => ({
      day: new Date(time).toLocaleDateString('en-IN', { weekday: 'short' }),
      date: new Date(time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      maxTemp: weatherData.daily.temperature_2m_max[index],
      minTemp: weatherData.daily.temperature_2m_min[index],
      precipitation: weatherData.daily.precipitation_sum[index],
      maxWind: weatherData.daily.wind_speed_10m_max[index]
    }))
  }

  // Show loading state while checking authentication
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show redirecting state if user is not authenticated
  if (!user || !user.isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{globalT("weather.title")}</h1>
          <p className="text-gray-600">{globalT("weather.subtitle")}</p>
        </div>

        {/* District Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {globalT("weather.selectDistrict")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <Select value={selectedDistrict.name} onValueChange={(value) => {
                const district = districts.find(d => d.name === value)
                if (district) setSelectedDistrict(district)
              }}>
                <SelectTrigger className="w-80 bg-white border-2 border-gray-300 focus:border-green-600">
                  <SelectValue placeholder="Select a district" className="text-gray-900" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-300 w-80">
                  {districts.map((district) => (
                    <SelectItem key={district.name} value={district.name} className="text-gray-900 hover:bg-green-100 focus:bg-green-100">
                      {district.name} - {district.hq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => fetchWeatherData(selectedDistrict)}
                disabled={loading}
                variant="outline"
                size="sm"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {globalT("weather.refresh")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {loading && (
          <Card className="mb-6">
            <CardContent className="pt-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{globalT("weather.loading")}</p>
            </CardContent>
          </Card>
        )}

        {weatherData && (
          <>
            {/* Current Weather */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{globalT("weather.temperature")}</p>
                      <p className={`text-2xl font-bold ${getTemperatureColor(weatherData.current.temperature_2m)}`}>
                        {weatherData.current.temperature_2m}°C
                      </p>
                    </div>
                    <Thermometer className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{globalT("weather.humidity")}</p>
                      <p className={`text-2xl font-bold ${getHumidityColor(weatherData.current.relative_humidity_2m || 0)}`}>
                        {weatherData.current.relative_humidity_2m}%
                      </p>
                    </div>
                    <Droplets className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{globalT("weather.windSpeed")}</p>
                      <p className={`text-2xl font-bold ${getWindSpeedColor(weatherData.current.wind_speed_10m)}`}>
                        {weatherData.current.wind_speed_10m} km/h
                      </p>
                    </div>
                    <Wind className="w-8 h-8 text-gray-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 mb-2">{globalT("weather.farmingAdvice")}</p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800 leading-relaxed">
                          {getFarmingAdvice(weatherData)}
                        </p>
                      </div>
                    </div>
                    <Sun className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="weekly" className="mb-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger value="weekly" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700">{globalT("weather.weeklyForecast")}</TabsTrigger>
                <TabsTrigger value="temperature" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700">{globalT("weather.temperature")}</TabsTrigger>
                <TabsTrigger value="humidity" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700">{globalT("weather.humidity")}</TabsTrigger>
                <TabsTrigger value="wind" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700">{globalT("weather.windSpeed")}</TabsTrigger>
              </TabsList>

              <TabsContent value="weekly">
                <Card>
                  <CardHeader>
                    <CardTitle>{globalT("weather.weeklyForecast")}</CardTitle>
                    <CardDescription>{globalT("weather.weeklyOutlook")} {selectedDistrict.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Weekly Chart */}
                    <div className="mb-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={prepareWeeklyData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="maxTemp" stroke="#dc2626" strokeWidth={3} name="Max Temp" />
                          <Line type="monotone" dataKey="minTemp" stroke="#1e40af" strokeWidth={3} name="Min Temp" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Weekly Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                      {prepareWeeklyData().map((day, index) => (
                        <div key={index} className="bg-gradient-to-b from-blue-50 to-green-50 rounded-lg p-4 border border-gray-200">
                          <div className="text-center">
                            <h3 className="font-semibold text-gray-800">{day.day}</h3>
                            <p className="text-sm text-gray-600 mb-3">{day.date}</p>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-800">High</span>
                                <span className={`font-bold ${getTemperatureColor(day.maxTemp)}`}>
                                  {day.maxTemp}°C
                                </span>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-800">Low</span>
                                <span className={`font-bold ${getTemperatureColor(day.minTemp)}`}>
                                  {day.minTemp}°C
                                </span>
                              </div>
                              
                              {day.precipitation > 0 && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-800">Rain</span>
                                  <span className="font-bold text-blue-800">
                                    {day.precipitation}mm
                                  </span>
                                </div>
                              )}
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-800">Wind</span>
                                <span className={`font-bold ${getWindSpeedColor(day.maxWind)}`}>
                                  {day.maxWind} km/h
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="temperature">
                <Card>
                  <CardHeader>
                    <CardTitle>24-Hour Temperature Forecast</CardTitle>
                    <CardDescription>Temperature trends for the next 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={prepareChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temperature" stroke="#ea580c" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="humidity">
                <Card>
                  <CardHeader>
                    <CardTitle>24-Hour Humidity Forecast</CardTitle>
                    <CardDescription>Relative humidity trends for the next 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={prepareChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="humidity" fill="#1e40af" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wind">
                <Card>
                  <CardHeader>
                    <CardTitle>24-Hour Wind Speed Forecast</CardTitle>
                    <CardDescription>Wind speed trends for the next 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={prepareChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="wind" stroke="#374151" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Farming Insights */}
            <Card>
              <CardHeader>
                <CardTitle>🌾 Farming Insights for {selectedDistrict.name}</CardTitle>
                <CardDescription>Weather-based recommendations for agricultural activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-700">Current Conditions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Temperature: {weatherData.current.temperature_2m}°C - {weatherData.current.temperature_2m > 30 ? 'Hot' : 'Moderate'}</li>
                      <li>• Humidity: {weatherData.current.relative_humidity_2m}% - {weatherData.current.relative_humidity_2m && weatherData.current.relative_humidity_2m > 70 ? 'High' : 'Normal'}</li>
                      <li>• Wind: {weatherData.current.wind_speed_10m} km/h - {weatherData.current.wind_speed_10m > 15 ? 'Strong' : 'Light'}</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-700">Recommendations</h4>
                    <ul className="text-sm space-y-1">
                      {weatherData.current.temperature_2m > 35 && <li>• Increase irrigation frequency</li>}
                      {weatherData.current.relative_humidity_2m && weatherData.current.relative_humidity_2m > 80 && <li>• Monitor for fungal diseases</li>}
                      {weatherData.current.wind_speed_10m > 15 && <li>• Secure young plants and structures</li>}
                      {weatherData.current.temperature_2m < 25 && weatherData.current.relative_humidity_2m && weatherData.current.relative_humidity_2m < 60 && <li>• Good conditions for planting</li>}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
