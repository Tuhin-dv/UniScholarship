
import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

const teachers = [
  {
    id: 1,
    name: "Dr. Mahmudul Hasan",
    subject: "IELTS & Spoken English",
    university: "University of Dhaka",
    image: "https://i.ibb.co/pvY2yh6L/immo-wegmann-r-Re-G42-Hkqo4-unsplash.jpg",
    rating: 4.8,
    verified: true,
    bio: "10+ years of experience in preparing students for IELTS, TOEFL, and general speaking."
  },
  {
    id: 2,
    name: "Ms.  Afrin Ahmed",
    subject: "Computer Programming",
    university: "BUET",
    image: "https://i.ibb.co/zHFrhrNJ/linkedin-sales-solutions-Npy-F7rjqmq4-unsplash.jpg",
    rating: 4.9,
    verified: true,
    bio: "Expert in teaching JavaScript, React, and Python with hands-on projects."
  },
  {
    id: 3,
    name: "Mr. Tawhidul Islam",
    subject: "French Language",
    university: "University of Paris",
    image: "https://i.ibb.co/1GdYp7GL/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg",
    rating: 4.7,
    verified: false,
    bio: "Specialized in beginner to intermediate French learning with cultural context."
  },
  {
    id: 3,
    name: "Tuhin Ahmed",
    subject: "French Language",
    university: "University of Paris",
    image: "https://i.ibb.co/1GdYp7GL/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg",
    rating: 4.7,
    verified: true,
    bio: "Specialized in beginner to intermediate French learning with cultural context."
  },
];

const TeacherSection = () => {
  return (
    <section className="max-w-[1780px] mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">Meet Our Expert Teachers</h2>
        <p className="text-black/70 max-w-xl mx-auto">
          Learn from experienced educators who are passionate about helping you succeed.
        </p>
      </div>

      <div className="max-w-[1780px] px-8 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-2xl rounded-3xl overflow-hidden hover:shadow-2xl transition duration-300 group border border-purple-100"
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-3xl border-b-4 border-blue-100"
            />

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-purple-900">
                  {teacher.name}
                </h3>
                {teacher.verified ? (
                  <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold rounded-full shadow flex items-center gap-1">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Verified
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 text-xs font-bold rounded-full shadow">Unverified</span>
                )}
              </div>
              <p className="text-sm text-blue-700 font-medium">
                {teacher.subject} <span className="mx-2">|</span> <span className="font-semibold text-purple-700">{teacher.university}</span>
              </p>
              <p className="text-purple-700 text-sm leading-relaxed line-clamp-3">
                {teacher.bio}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-blue-100">
                <span className="flex items-center gap-1 text-yellow-500 font-bold text-base">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" /></svg>
                  {teacher.rating}
                </span>
                <button className="text-sm px-5 py-2 bg-sky-500 text-white rounded-full shadow hover:scale-105 transition-all font-bold flex items-center gap-2">
                  Expert
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherSection;
