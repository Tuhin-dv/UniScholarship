import React from "react";
import BannerSlider from "../../components/BannerSlider";
import ScholarshipCard from "../../components/ScholarshipCard";
import { Link } from "react-router-dom";
import Testimonials from "../../components/testimonials";
import HowItWorks from "../../components/HowItWorks";
import TeacherSection from "../../components/TeacherSection";
import useTopScholarships from "../../hooks/useTopScholarships";
import Newsletter from "../../components/Newsletter";
import AboutUs from "../../components/AboutUs";

function Home() {
  const { topScholarships, isLoading } = useTopScholarships();

  return (
    <>
      <div>
        <div className="min-h-screen bg-sky-50 relative overflow-hidden">
          {/* Banner Section */}
          <div className="relative">
            <BannerSlider />
            <AboutUs></AboutUs>
            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Top Scholarships Section */}
          <section className="relative py-20 px-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className=" bg-gradient-to-r from-purple-600 to-blue-600 transform "></div>
            </div>

            <div className="max-w-[1700px] mx-auto relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-700 rounded-2xl mb-6 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    <span className="text-sky-500 primary-font">Top Scholarships</span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Discover the most affordable and prestigious scholarship
                    opportunities carefully curated for your academic journey
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50">
                    <div className="text-2xl font-bold text-purple-600">
                      {topScholarships.length}+
                    </div>
                    <div className="text-sm text-gray-600">Total Scholarships</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50">
                    <div className="text-2xl font-bold text-blue-600">50+</div>
                    <div className="text-sm text-gray-600">Universities</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-md w-full border border-white/50">
                    <div className="flex flex-col items-center space-y-8">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 shadow-lg"></div>
                        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 absolute top-2 left-2 animate-reverse"></div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          Loading Top Scholarships
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Discovering the best opportunities for you...
                        </p>
                        <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {topScholarships.map((item, idx) => (
                      <div key={idx}>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-xl -z-10 transform scale-110"></div>
                          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl  transition-all duration-500">
                            <ScholarshipCard scholarship={item} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-16">
                    <div className="border-sky-500 border-b-8 border-l-8 bg-gradient-to-br from-sky-500 via-sky-700 to-blue-700 relative rounded-3xl p-8 md:p-12 shadow-2xl">
                      <div className="max-w-3xl mx-auto text-white">
                        <h3 className="text-3xl md:text-4xl primary-font font-bold mb-4">
                          Ready to Start Your Journey?
                        </h3>
                        <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                          Join thousands of students who have already secured their
                          dream scholarships through our platform
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link to="/all-scholarships">
                            <button className="bg-white text-sky-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                              Browse All Scholarships
                            </button>
                          </Link>
                          <button className="bg-purple-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-purple-500/50 transition-all duration-300">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-32 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-30 animate-bounce animation-delay-200"></div>
            <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-25 animate-bounce animation-delay-300"></div>
            <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-indigo-400 rounded-full opacity-20 animate-bounce animation-delay-150"></div>
          </section>
          <div className=" py-16">
            <TeacherSection />
          </div>
        </div>

        {/* Other Sections */}

        <HowItWorks />
        <Testimonials />
        <Newsletter></Newsletter>
      </div>
    </>
  );
}

export default Home;
