import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, Star, Users, Award, Play, Pause } from "lucide-react"
import img1 from '../assets/Rectangle (3).svg'
import img2 from '../assets/Rectangle (4).svg'
import img3 from '../assets/sss.svg'

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      title: "Find Your Dream Scholarship",
      subtitle: "Education Made Affordable",
      description:
        "Discover thousands of scholarship opportunities tailored to your academic profile. Start your journey towards higher education without financial barriers.",
      buttonText: "Get Started",
      stats: "10,000+ Students Helped",
      bgGradient: "bg-gradient-to-br from-sky-500 via-sky-700 to-blue-700",
      illustration: img1,
    },
    {
      id: 2,
      title: "Global Study Opportunities",
      subtitle: "Study Abroad Programs",
      description:
        "Explore international scholarship programs from top universities worldwide. Transform your future with world-class education and cultural experiences.",
      buttonText: "Explore Now",
      stats: "50+ Countries Available",
      bgGradient: "bg-gradient-to-br from-sky-500 via-sky-700 to-blue-700",
      illustration: img2,
    },
    {
      id: 3,
      title: "Success Stories Await",
      subtitle: "Join Our Community",
      description:
        "Be part of thousands of successful scholarship recipients who achieved their dreams. Your success story starts here with the right guidance and support.",
      buttonText: "Join Now",
      stats: "95% Success Rate",
      bgGradient: "bg-gradient-to-br from-sky-500 via-sky-700 to-blue-700",
      illustration: img3,
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length, isPlaying])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const goToSlide = (index) => setCurrentSlide(index)

  return (
    <div className="relative w-full min-h-screen lg:h-[700px] overflow-hidden bg-white shadow-2xl">

      {/* Slides Container */}
      <div
        className="flex transition-transform duration-1000 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={`min-w-full h-full bg-gradient-to-br ${slide.bgGradient} relative`}>
            
            {/* BG Image */}
            <div className="absolute inset-0 bg-[url('/bannerBgImg.jpg')] bg-cover bg-center opacity-10"></div>

            {/* Geometric Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            <div className="relative z-10 max-w-[1780px] mx-auto px-6 sm:px-8 lg:px-12 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full">
                {/* Left Side - Text Content */}
                <div className="space-y-8 text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-semibold border border-white/20 shadow-lg">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    {slide.stats}
                  </div>

                  {/* Main Content */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-orange-300 text-lg font-semibold tracking-wider uppercase">{slide.subtitle}</p>
                      <h1 className="text-5xl primary-font md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                        {slide.title}
                      </h1>
                    </div>
                    <p className="text-slate-200 secondary-font text-xl leading-relaxed max-w-xl font-light">{slide.description}</p>
                  </div>

                  {/* CTA Section */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="group inline-flex items-center justify-center gap-3 bg-sky-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-orange-500/25 border border-orange-400/20">
                      {slide.buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <button className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-xl">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </button>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-8 pt-6">
                    <div className="flex items-center gap-3 text-slate-200">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">Trusted Platform</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-200">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">Verified Scholarships</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Illustration */}
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Main Illustration Container */}
                    <div className="relative w-full max-w-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl"></div>
                      <div className="relative p-8">
                        <img
                          src={slide.illustration || "/placeholder.svg"}
                          alt={`${slide.title} illustration`}
                          className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                        />
                      </div>
                    </div>

                    {/* Additional Decorative Elements */}
                    <div
                      className="absolute top-3/4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center animate-bounce shadow-xl border border-green-300/20"
                      style={{ animationDelay: "1s" }}
                    >
                      <span className="text-white text-lg">📚</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border border-white/20"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2  transform -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${index === currentSlide
              ? "w-8 h-2 bg-sky-300 rounded-full shadow-lg"
              : "w-2 h-2 bg-white/50 hover:bg-white/75 rounded-full hover:scale-125"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <div className="ml-3 text-white/70 text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-sky-200 transition-all duration-1000 ease-linear shadow-lg"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default BannerSlider
