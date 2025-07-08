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
          <p className="text-center text-gray-500">Loading scholarships...</p>
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
