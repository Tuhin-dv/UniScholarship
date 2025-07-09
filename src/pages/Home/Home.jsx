import React from 'react'
import BannerSlider from '../../components/BannerSlider'
import useScholarships from '../../hooks/useScholarships'
import ScholarshipCard from '../../components/ScholarshipCard'

function Home() {
  const { scholarships, isLoading } = useScholarships()

  const topScholarships = scholarships
    .sort((a, b) => a.applicationFees - b.applicationFees) // sort by fees
    .slice(0, 6) // pick top 6

  return (
    <div>
      <BannerSlider />

      <section className="max-w-7xl mx-auto px-4 my-16">
        <h2 className="text-3xl font-bold text-center mb-8">Top Scholarships</h2>

        {isLoading ? (
          <div className="min-h-screen  p-6 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
              <div className="flex flex-col items-center space-y-6">
                {/* Animated Loading Spinner */}
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 absolute top-2 left-2 animate-reverse"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Loading Top Scholarships
                  </h3>
                  <p className="text-gray-600">
                    Please wait while we fetch your data...
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topScholarships.map((item, idx) => (
              <ScholarshipCard key={idx} scholarship={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
