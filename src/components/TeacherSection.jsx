import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const teachers = [
  {
    id: 1,
    name: "Dr. Mahmudul Hasan",
    subject: "IELTS & Spoken English",
    university: "University of Dhaka",
    image: "https://i.ibb.co/pvY2yh6L/immo-wegmann-r-Re-G42-Hkqo4-unsplash.jpg",
    rating: 4.8,
    verified: true,
    bio: "10+ years of experience in preparing students for IELTS, TOEFL, and general speaking.",
  },
  {
    id: 2,
    name: "Ms. Afrin Ahmed",
    subject: "Computer Programming",
    university: "BUET",
    image: "https://i.ibb.co/zHFrhrNJ/linkedin-sales-solutions-Npy-F7rjqmq4-unsplash.jpg",
    rating: 4.9,
    verified: true,
    bio: "Expert in teaching JavaScript, React, and Python with hands-on projects.",
  },
  {
    id: 3,
    name: "Mr. Tawhidul Islam",
    subject: "French Language",
    university: "University of Paris",
    image: "https://i.ibb.co/1GdYp7GL/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg",
    rating: 4.7,
    verified: false,
    bio: "Specialized in beginner to intermediate French learning with cultural context.",
  },
  {
    id: 4,
    name: "Tuhin Ahmed",
    subject: "French Language",
    university: "University of Paris",
    image: "https://i.ibb.co.com/1Y3cJbhL/usman-yousaf-GFOlzp-Lui-Cg-unsplash.jpg",
    rating: 4.7,
    verified: true,
    bio: "Specialized in beginner to intermediate French learning with cultural context.",
  },
];

const TeacherSection = () => {
  return (
    <section className="max-w-[1740px] mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-5xl primary-font font-bold text-black mb-2">
          Meet Our Expert Teachers
        </h2>
        <p className="text-black/70 text-xl mt-2 max-w-xl mx-auto">
          Learn from experienced educators who are passionate about helping you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-gradient-to-br from-white via-blue-50 to-purple-50 border border-purple-100 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 p-6"
          >
            <div className="w-full h-60 overflow-hidden rounded-2xl mb-4">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-purple-900">{teacher.name}</h3>
              <p className="text-sm text-blue-700 font-medium">
                {teacher.subject} <span className="mx-2">|</span>{" "}
                <span className="text-purple-700 font-semibold">{teacher.university}</span>
              </p>
              <p className="text-gray-700 text-sm">{teacher.bio}</p>

              <div className="flex flex-wrap gap-3 items-center pt-3">
                <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  ⭐ {teacher.rating}
                </span>

                {teacher.verified ? (
                  <span className="flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                    <FaCheckCircle className="text-green-600" />
                    Verified
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-300 text-gray-700 text-sm font-semibold rounded-full">
                    Unverified
                  </span>
                )}

                <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Expert
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherSection;
