"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"

// Mock authentication check
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setIsLoading(false)
  }, [])

  return { isLoggedIn, isLoading }
}

export default function VesselBooking() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your backend
    // For demo purposes, we'll just redirect to the tracking page
    router.push("/product/vessel/tracking")
  }

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      // Redirect to sign-in page with a redirect back to this page
      router.push(`/signin?redirect=${encodeURIComponent("/product/vessel/booking")}`)
    }
  }, [isLoggedIn, isLoading, router])

  // If still loading or not logged in, show loading state
  if (isLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
        </div>

        {/* Loading indicator */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-white/80 p-8 rounded-lg">
            <p className="text-xl">Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Vessel Booking Form */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="company" className="block text-white text-lg mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="rent" className="block text-white text-lg mb-2">
                Rent
              </label>
              <input
                type="text"
                id="rent"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="cargo" className="block text-white text-lg mb-2">
                Cargo Item
              </label>
              <input
                type="text"
                id="cargo"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="vesselSize" className="block text-white text-lg mb-2">
                Vessel Size
              </label>
              <input
                type="text"
                id="vesselSize"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-white text-lg mb-2">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="pol" className="block text-white text-lg mb-2">
                POL
              </label>
              <input
                type="text"
                id="pol"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="pod" className="block text-white text-lg mb-2">
                POD
              </label>
              <input
                type="text"
                id="pod"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="laycan" className="block text-white text-lg mb-2">
                Laycan
              </label>
              <input
                type="text"
                id="laycan"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-white text-lg mb-2">
                Budget
              </label>
              <input
                type="text"
                id="budget"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-[#3498db] text-white px-8 py-3 rounded-md font-medium hover:bg-[#2980b9] transition"
              >
                Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
