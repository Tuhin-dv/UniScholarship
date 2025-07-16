import React from "react";
import { Lightbulb, BookOpenCheck, Send, Medal } from "lucide-react";

const steps = [
    {
        icon: <Lightbulb className="w-10 h-10 text-purple-400" />,
        title: "Discover Scholarships",
        description:
            "Browse from a wide range of scholarships from top universities worldwide, tailored to your goals.",
    },
    {
        icon: <BookOpenCheck className="w-10 h-10 text-blue-400" />,
        title: "Apply Easily",
        description:
            "Fill out applications with our simple form. Upload required documents and track your progress.",
    },
    {
        icon: <Send className="w-10 h-10 text-pink-400" />,
        title: "Submit & Wait",
        description:
            "After submitting, our moderators and universities will review your application carefully.",
    },
    {
        icon: <Medal className="w-10 h-10 text-green-400" />,
        title: "Get Selected",
        description:
            "Receive selection emails, feedback, and confirm your admission and funding easily.",
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-gradient-to-br from-sky-500 via-sky-700 to-blue-700 relative text-white py-24 overflow-hidden">
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
                        className={`absolute w-2 h-2 bg-white/15 rounded-full animate-float-${(i % 9) + 1}`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    ></div>
                ))}
            </div>
            {/* Floating dots */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/10 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 3}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-5xl font-extrabold mb-6">
                    <span className="text-white">
                        How It Works
                    </span>
                </h2>
                <p className="text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
                    Follow these 4 simple steps to land your dream scholarship and start your international education journey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative bg-white/5 border border-white/20 rounded-xl p-6 transition-transform duration-500 hover:scale-105 shadow-xl hover:shadow-[#990f2d]/20 backdrop-blur-md"
                        >
                            <div className="mb-6">{step.icon}</div>
                            <h3 className="text-xl font-semibold text-purple-200 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 8s ease infinite;
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
      `}</style>
        </section>
    );
};

export default HowItWorks;
