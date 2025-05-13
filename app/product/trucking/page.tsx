"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
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

export default function TruckingProduct() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const handleBookingClick = () => {
    if (isLoggedIn) {
      router.push("/product/trucking/booking")
    } else {
      router.push(`/signin?redirect=${encodeURIComponent("/product/trucking/booking")}`)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Trucking Product Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="bg-white/90 rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Trucking Management System</h1>
          <p className="mb-4">
            Our comprehensive trucking management solution optimizes your ground transportation operations. Using
            blockchain technology and IoT devices, we provide real-time visibility, route optimization, and secure
            documentation.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">Key Features:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Real-time fleet tracking and management</li>
            <li>Route optimization and fuel efficiency</li>
            <li>Driver management and compliance</li>
            <li>Maintenance scheduling and alerts</li>
            <li>Electronic logging device (ELD) integration</li>
            <li>Blockchain-based documentation and proof of delivery</li>
          </ul>
          <div className="mt-8 flex gap-4">
            <Link
              href="/contact"
              className="bg-[#f39c12] text-white px-6 py-3 rounded-md font-medium hover:bg-[#e67e22] transition"
            >
              Request a Demo
            </Link>
            <button
              onClick={handleBookingClick}
              className="bg-[#2ecc71] text-white px-6 py-3 rounded-md font-medium hover:bg-[#27ae60] transition"
            >
              Book a Truck
            </button>
          </div>
        </div>
      </div>

      {/* AI and ? icons at bottom corners */}
      <div className="relative z-10 container mx-auto px-4 pb-6">
        <div className="flex justify-between">
          <div className="text-white text-xl font-bold">AI</div>
          <div className="text-white text-xl font-bold">?</div>
        </div>
      </div>
    </div>
  )
}
