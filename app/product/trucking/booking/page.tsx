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

export default function TruckingBooking() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your backend
    // For demo purposes, we'll just redirect to the tracking page
    router.push("/product/trucking/info")
  }

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      // Redirect to sign-in page with a redirect back to this page
      router.push(`/signin?redirect=${encodeURIComponent("/product/trucking/booking")}`)
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

      {/* Trucking Booking Form */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Truck Booking Form</h1>

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
              <label htmlFor="cargoType" className="block text-white text-lg mb-2">
                Cargo Type
              </label>
              <input
                type="text"
                id="cargoType"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-white text-lg mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="truckType" className="block text-white text-lg mb-2">
                Truck Type
              </label>
              <select
                id="truckType"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              >
                <option value="" className="text-gray-800">
                  Select truck type
                </option>
                <option value="box" className="text-gray-800">
                  Box Truck
                </option>
                <option value="flatbed" className="text-gray-800">
                  Flatbed
                </option>
                <option value="refrigerated" className="text-gray-800">
                  Refrigerated
                </option>
                <option value="tanker" className="text-gray-800">
                  Tanker
                </option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="pickupLocation" className="block text-white text-lg mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                id="pickupLocation"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="deliveryLocation" className="block text-white text-lg mb-2">
                Delivery Location
              </label>
              <input
                type="text"
                id="deliveryLocation"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="pickupDate" className="block text-white text-lg mb-2">
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-[#f39c12] text-white px-8 py-3 rounded-md font-medium hover:bg-[#e67e22] transition"
              >
                Book Truck
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
