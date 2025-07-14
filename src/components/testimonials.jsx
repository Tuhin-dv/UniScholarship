import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Ayesha Siddique",
    profession: "Scholarship Winner, Canada",
    image: "https://i.ibb.co/x8RD46VN/compressed-alex-mccarthy-RGKd-WJOUFH0-unsplash.jpg",
    quote:
      "UniScholar made my dream come true. I applied, got selected, and now I'm studying abroad!",
    rating: 4,
    country: "Canada",
   
  },
  {
    name: "Farhan Ahmed",
    profession: "Language Student, Japan",
    image: "https://i.ibb.co/F4sk2Qvk/irene-strong-v2a-Knj-Mb-P-k-unsplash.jpg",
    quote:
      "Simple process, responsive team, and everything was organized. Highly recommend UniScholar!",
    rating: 4,
    country: "Japan",
    
  },
  {
    name: "Nusrat Jahan",
    profession: "Masters Candidate, UK",
    image: "https://i.ibb.co/DHJF6Gy7/joshua-rondeau-Zn-HRNtw-Xg6-Q-unsplash.jpg",
    quote:
      "UniScholar helped me get a full scholarship. Their platform is truly a life-changer.",
    rating: 3,
    country: "United Kingdom",
    
  },
  {
    name: "Imran Kabir",
    profession: "PhD Scholar, Germany",
    image: "https://i.ibb.co/1GdYp7GL/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg",
    quote:
      "UniScholar supported me at every step. From application to interview, it was seamless.",
    rating: 4,
    country: "Germany",
    
  },
  {
    name: "Tuhin Ahmed",
    profession: "Undergraduate, Australia",
    image: "https://i.ibb.co/20bmfhwf/1749574169155.jpg",
    quote:
      "I never thought I'd study abroad until I found UniScholar. Highly professional and helpful.",
    rating: 5,
    country: "Australia",
    
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000); // Resume auto-play after 10s
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000); // Resume auto-play after 10s
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sky-500 via-white to-purple-500 py-20 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-bounce animation-delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-purple-400 rounded-full animate-float-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-8 shadow-2xl">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className=" text-black  animate-gradient">
              What Our Students Say!
            </span>
          </h2>

          <p className="text-xl text-black/80 max-w-3xl mx-auto leading-relaxed">
            Discover how our platform has transformed lives and opened doors to
            educational opportunities worldwide
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">500+</div>
              <div className="text-gray-400">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">$2M+</div>
              <div className="text-gray-400">Scholarships Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">50+</div>
              <div className="text-gray-400">Countries</div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="flex items-center justify-center min-h-[600px] perspective-1000">
            {testimonials.map((testimonial, index) => {
              const isActive = index === current;
              const isPrev =
                index ===
                (current - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (current + 1) % testimonials.length;

              let transform = "translateX(0) translateZ(0) rotateY(0)";
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                transform =
                  "translateX(0) translateZ(100px) rotateY(0) scale(1.1)";
                opacity = 1;
                zIndex = 30;
              } else if (isPrev) {
                transform =
                  "translateX(-80%) translateZ(-50px) rotateY(25deg) scale(0.8)";
                opacity = 0.7;
                zIndex = 20;
              } else if (isNext) {
                transform =
                  "translateX(80%) translateZ(-50px) rotateY(-25deg) scale(0.8)";
                opacity = 0.7;
                zIndex = 20;
              }

              return (
                <div
                  key={index}
                  className={`absolute w-full max-w-2xl transition-all duration-700 ease-out transform-gpu ${
                    isActive ? "animate-float" : ""
                  }`}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                  }}
                >
                  <TestimonialCard data={testimonial} isActive={isActive} />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
            <button
              onClick={prevSlide}
              className="group w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-125 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
            <button
              onClick={nextSlide}
              className="group w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-125 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center items-center space-x-4 mt-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setAutoPlay(false);
                setTimeout(() => setAutoPlay(true), 10000);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? "w-12 h-3 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                  : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="flex justify-center mt-8">
        
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 4s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 5s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

const TestimonialCard = ({ data, isActive }) => {
  return (
  <div
  className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-[#990f2d54] rounded-3xl p-8 shadow-2xl transition-all duration-700 ${
    isActive ? "shadow-purple-500/30" : "shadow-black/20"
  }`}
>
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Quote */}
        <blockquote className="text-xl md:text-2xl text-black border-black font-medium leading-relaxed italic">
          "{data.quote}"
        </blockquote>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(data.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={data.image}
              alt={data.name}
              className="w-20 h-20 rounded-full border-4 border-gradient-to-r from-purple-600 to-blue-600 object-cover shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-2xl font-bold text-black mb-1">{data.name}</h4>
            <p className="text-black font-medium mb-2">
              {data.profession}
            </p>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-black">{data.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-black">{data.scholarship}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-3xl"></div>
    </div>
  );
};

export default Testimonials;
