"use client"

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

export default function ShipTracking() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  // Handle order button click
  const handleOrderClick = () => {
    router.push("/product/vessel/order-confirmation")
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

      {/* Live Ship Tracking Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Live Ship Condition</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ship Image - Made more square */}
          <div className="bg-white/90 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image src="/images/cargo-ship.jpg" alt="Cargo Ship" fill className="object-cover" />
            </div>
          </div>

          {/* Ship Particulars - Made more square and compact */}
          <div className="bg-white/90 rounded-lg p-4 aspect-square overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Image
                  src="/images/shipping-logo.png"
                  alt="Shipping Company Logo"
                  width={60}
                  height={30}
                  className="mr-2"
                />
                <div>
                  <h3 className="font-bold text-sm">PT. Andalan Samudra</h3>
                  <p className="text-xs">Kapal Motor Utama Indonesia</p>
                </div>
              </div>
            </div>

            <h2 className="text-center font-bold text-lg mb-2 border-b pb-1">SHIP PARTICULARS</h2>

            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="font-semibold">NAME OF VESSEL</div>
              <div>TK. SANDHEWA - 23</div>

              <div className="font-semibold">FLAG</div>
              <div>INDONESIA</div>

              <div className="font-semibold">YEAR BUILT</div>
              <div>1997 / 2017</div>

              <div className="font-semibold">L.O.A</div>
              <div>27.00 M</div>

              <div className="font-semibold">BREADTH MOULDED</div>
              <div>8.00 M</div>

              <div className="font-semibold">DEPTH MOULDED</div>
              <div>2.50 M</div>

              <div className="font-semibold">DRAFT MAX</div>
              <div>1.80 M</div>

              <div className="font-semibold">GRT / NRT</div>
              <div>175 / 52</div>
            </div>

            <div className="mt-2 h-1/4 relative">
              <Image src="/images/small-vessel.jpg" alt="Vessel Image" fill className="object-cover rounded" />
            </div>

            <div className="mt-2 text-center text-xs">
              <p>Our Services</p>
              <p>Ship Management | Freight Management | Resources</p>
              <p>www.andalansamudra.com</p>
            </div>
          </div>

          {/* Map - Made more square */}
          <div className="bg-white/90 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image src="/images/indonesia-map.jpg" alt="Ship Location Map" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2"></div>
          <div className="bg-white/90 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-4">Terms & Conditions</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <input type="checkbox" id="term1" className="mt-1 mr-2" />
                <label htmlFor="term1">Gak boleh ngeroko</label>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="term2" className="mt-1 mr-2" />
                <label htmlFor="term2">Harus mandi 3x sehari</label>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="term3" className="mt-1 mr-2" />
                <label htmlFor="term3">Harus mandi 3x sehari</label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleOrderClick}
            className="bg-[#3498db]/80 hover:bg-[#3498db] text-white px-8 py-3 rounded-md font-medium transition"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  )
}
