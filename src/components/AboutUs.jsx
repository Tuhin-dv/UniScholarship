"use client"

import { Lightbulb, Target, GraduationCap } from "lucide-react"

export default function AboutUs() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 primary-font">
          About <span className="text-sky-500">UniScholar</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          Empowering students to achieve their dreams with the right scholarship opportunities.  
          We connect learners with global education possibilities.
        </p>

        {/* Mission/Vision/Goal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Vision */}
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl shadow-xl p-10 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <div className="flex justify-center items-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-600 mx-auto mb-6 shadow-inner">
              <Lightbulb size={36} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To make global education accessible for every student by providing the 
              best scholarship opportunities worldwide.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl shadow-xl p-10 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <div className="flex justify-center items-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 mx-auto mb-6 shadow-inner">
              <Target size={36} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To guide students step by step in their scholarship journey, helping them 
              achieve success with clarity and confidence.
            </p>
          </div>

          {/* Goal */}
          <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-3xl shadow-xl p-10 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
            <div className="flex justify-center items-center w-20 h-20 rounded-full bg-gradient-to-r from-sky-100 to-sky-200 text-sky-600 mx-auto mb-6 shadow-inner">
              <GraduationCap size={36} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Goal</h3>
            <p className="text-gray-600 leading-relaxed">
              To build a community where every deserving student can access quality 
              education without financial barriers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
