"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function BlogCarousel() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const blogs = [
    {
      title: "Sustainable Farming Practices for 2024",
      excerpt:
        "Discover the latest sustainable farming techniques that are revolutionizing agriculture while protecting our environment.",
      image: "/sustainble.jpg",
      date: "March 15, 2024",
      readTime: "5 min read",
      url: "https://kshema.co/blogs/sustainable-farming-practices-every-farmer-should-know/", 
    },
    {
      title: "AI in Agriculture: The Future is Now",
      excerpt:
        "How artificial intelligence is transforming crop monitoring, yield prediction, and farm management systems.",
      image: "/aiagriculture.jpg",
      date: "March 12, 2024",
      readTime: "7 min read",
      url: "https://www.forbes.com/sites/ganeskesari/2024/03/31/the-future-of-farming-ai-innovations-that-are-transforming-agriculture/", 
    },
    {
      title: "Water Conservation Techniques",
      excerpt: "Innovative irrigation methods and water management strategies to maximize efficiency and reduce waste.",
      image: "/water.jpg",
      date: "March 10, 2024",
      readTime: "4 min read",
      url: "https://waterconservation.artofliving.org/different-methods-of-water-conservation.php", 
    },
    {
      title: "Organic Pest Control Solutions",
      excerpt: "Natural and eco-friendly approaches to pest management that protect crops without harmful chemicals.",
      image: "/orgainc.jpg",
      date: "March 8, 2024",
      readTime: "6 min read",
      url: "https://farmonaut.com/blogs/organic-pest-control-7-proven-tips-for-healthier-crops", 
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length)
  }

  const handleBlogClick = (url: string) => {
    // You can replace this with your actual blog URLs
    // For now, it will redirect to the URL you specify
    window.open(url, '_blank')
  }

  const visibleBlogs = [
    blogs[currentIndex],
    blogs[(currentIndex + 1) % blogs.length],
    blogs[(currentIndex + 2) % blogs.length],
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-3xl md:text-4xl ag-text mb-4">{t("blog.title")}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-[#2B9348] text-[#2B9348] hover:bg-[#2B9348] hover:text-white ag-shadow bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>

          <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-[#2B9348] text-[#2B9348] hover:bg-[#2B9348] hover:text-white ag-shadow bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Blog Cards */}
          <div className="grid md:grid-cols-3 gap-6 overflow-hidden">
            {visibleBlogs.map((blog, index) => (
              <Card
                key={`${currentIndex}-${index}`}
                className="overflow-hidden ag-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 cursor-pointer"
                onClick={() => handleBlogClick(blog.url)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl ag-text mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-[#2B9348] hover:text-[#1B5E3B] font-medium"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent card click when button is clicked
                      handleBlogClick(blog.url)
                    }}
                  >
                    {t("blog.read_more")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center mt-6 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="rounded-full border-[#2B9348] text-[#2B9348] hover:bg-[#2B9348] hover:text-white bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="rounded-full border-[#2B9348] text-[#2B9348] hover:bg-[#2B9348] hover:text-white bg-transparent"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
