import React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white">
      <div className="text-center px-6">
        <h1 className="text-8xl font-extrabold tracking-widest">404</h1>
        <p className="text-2xl mt-4 font-semibold">Page Not Found</p>
        <p className="mt-2 text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-lg font-medium rounded-2xl shadow-lg transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
