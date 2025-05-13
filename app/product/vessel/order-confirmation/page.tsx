"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"
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

export default function OrderConfirmation() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  // Get current date for order date
  const currentDate = new Date()
  const orderDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Calculate dates for tracking
  const confirmationDate = new Date()
  confirmationDate.setDate(confirmationDate.getDate() + 1) // Tomorrow

  const shippedDate = new Date(confirmationDate)
  const outForDeliveryDate = new Date(confirmationDate)
  const deliveredDate = new Date(confirmationDate)
  deliveredDate.setDate(deliveredDate.getDate() + 5) // 5 days after confirmation

  const formatDate = (date) => {
    const day = date.getDate()
    const suffix = getDaySuffix(day)
    const month = date.toLocaleString("en-US", { month: "short" })
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" })
    return `${dayOfWeek}, ${day}${suffix} ${month}`
  }

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"
    switch (day % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/signin")
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

      {/* Order Confirmation Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Order Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-white">
              <span className="font-medium">Order date:</span> {orderDate}
            </div>
            <Link
              href="/product/vessel/ship-details"
              className="flex items-center text-white hover:text-green-300 transition"
            >
              <FileText className="mr-2 h-5 w-5" />
              <span>Ship Detail</span>
            </Link>
          </div>

          {/* Order Tracking */}
          <div className="bg-white/90 rounded-lg p-6 mb-8">
            <div className="relative">
              {/* Progress Bar */}
              <div className="h-1 bg-gray-200 absolute top-7 left-0 right-0 mx-16">
                <div className="h-1 bg-green-500 w-1/4"></div>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between relative">
                {/* Step 1: Order Confirmed */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="mt-2 font-medium text-green-600">Order Confirmed</p>
                  <p className="text-sm text-gray-600">{formatDate(confirmationDate)}</p>
                </div>

                {/* Step 2: Shipped */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="mt-2 font-medium text-gray-500">Shipped</p>
                  <p className="text-sm text-gray-600">{formatDate(shippedDate)}</p>
                </div>

                {/* Step 3: Out For Delivery */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="mt-2 font-medium text-gray-500">Out For Delivery</p>
                  <p className="text-sm text-gray-600">{formatDate(outForDeliveryDate)}</p>
                </div>

                {/* Step 4: Delivered */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="mt-2 font-medium text-gray-500">Delivered</p>
                  <p className="text-sm text-gray-600">Expected by, {formatDate(deliveredDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white/90 rounded-lg overflow-hidden aspect-[2/1]">
            <div className="relative w-full h-full">
              <Image src="/images/indonesia-map-large.jpg" alt="Ship Location Map" fill className="object-cover" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-6 h-6 bg-red-500 rounded-full animate-ping absolute"></div>
                  <div className="w-6 h-6 bg-red-500 rounded-full relative z-10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
