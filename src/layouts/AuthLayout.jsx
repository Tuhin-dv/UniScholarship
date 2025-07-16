import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Auth Section */}
            <div className="flex-grow bg-gradient-to-br from-purple-50 via-white to-blue-50 py-10 px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Form Side */}
                        <div className="  flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <Outlet />
                            </div>
                        </div>

                        {/* Image/Illustration Side */}
                        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-sky-500 via-sky-700 to-blue-700 relative overflow-hidden">
                            {/* Decorative Elements */}     
                            <div className="absolute inset-0">
                                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
                                <div className="absolute top-32 right-16 w-16 h-16 bg-white/10 rounded-full"></div>
                                <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full"></div>
                                <div className="absolute bottom-32 right-10 w-12 h-12 bg-white/10 rounded-full"></div>

                                {/* Grid Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="grid grid-cols-8 grid-rows-8 h-full">
                                        {Array.from({ length: 64 }).map((_, i) => (
                                            <div key={i} className="border border-white/20"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="relative z-10 text-center text-white p-8">
                                <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <svg
                                        className="w-16 h-16 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>

                                <h2 className="text-3xl font-bold mb-4">Empower Your Education</h2>
                                <p className="text-xl text-purple-100 mb-6 leading-relaxed">
                                    Discover, apply, and manage scholarships easily with UniScholar — built to support your academic journey.
                                </p>

                                {/* Features List */}
                                <div className="space-y-3 text-left max-w-sm mx-auto">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span className="text-purple-100">Smart Scholarship Matching</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span className="text-purple-100">User-Friendly Dashboard</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span className="text-purple-100">Real-time Application Tracking</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span className="text-purple-100">Trusted by Students Nationwide</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}