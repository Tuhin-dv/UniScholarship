"use client"

import { useState } from "react"
import { Send, Mail, CheckCircle } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Subscribed:", email)
    setIsSubmitted(true)
    setEmail("")
    setIsLoading(false)

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-700 to-sky-600 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5"></div>

      <div className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm sm:h-20 sm:w-20">
            <Mail className="h-8 w-8 text-blue-200 sm:h-10 sm:w-10" />
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-2xl primary-font font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
            Stay Ahead in Your
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Scholarship Journey
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-base text-blue-100 sm:text-lg lg:text-xl">
            Get exclusive access to new scholarships, application tips, success stories, and deadline reminders
            delivered straight to your inbox.
          </p>

          {/* Form */}
          <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-2xl">
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-green-500/20 px-6 py-4 text-green-200 backdrop-blur-sm">
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm font-medium sm:text-base">
                  Successfully subscribed! Check your email for confirmation.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-0 sm:flex sm:gap-3">
                <div className="flex-1">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white placeholder-blue-200 backdrop-blur-sm transition-all duration-200 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:px-5 sm:py-4 sm:text-lg"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8 sm:py-4"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span className="sm:text-lg">Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span className="sm:text-lg">Subscribe</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-col items-center gap-4 text-sm text-blue-200 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Weekly updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
