"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DollarSign, Weight, Clock, Package, Anchor, MapPin, Info, Calendar } from "lucide-react"
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

// Common cargo types for shipping
const cargoTypes = [
  "General Cargo",
  "Bulk Cargo",
  "Container Cargo",
  "Liquid Bulk",
  "Break Bulk",
  "Neo Bulk",
  "Roll-on/Roll-off",
  "Project Cargo",
  "Refrigerated Cargo",
  "Dangerous Goods",
  "Other",
]

// Common Indonesian ports
const indonesianPorts = [
  "Tanjung Priok (Jakarta)",
  "Tanjung Perak (Surabaya)",
  "Belawan (Medan)",
  "Makassar (Ujung Pandang)",
  "Semarang",
  "Balikpapan",
  "Bitung",
  "Palembang",
  "Banjarmasin",
  "Sorong",
]

// Common international ports
const internationalPorts = [
  "Singapore",
  "Port Klang (Malaysia)",
  "Laem Chabang (Thailand)",
  "Ho Chi Minh City (Vietnam)",
  "Manila (Philippines)",
  "Shanghai (China)",
  "Hong Kong",
  "Busan (South Korea)",
  "Tokyo (Japan)",
  "Rotterdam (Netherlands)",
  "Hamburg (Germany)",
  "Antwerp (Belgium)",
  "Los Angeles (USA)",
  "New York (USA)",
  "Dubai (UAE)",
]

export default function VesselBooking() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  // Form state
  const [formData, setFormData] = useState({
    company: "",
    cargoType: "",
    cargoTypeOther: "",
    weightValue: "",
    weightUnit: "kg",
    vesselSize: "small",
    duration: "",
    pol: "",
    pod: "",
    laycanDate: "",
    budgetValue: "",
    budgetCurrency: "USD",
    notes: "",
  })

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Convert kg to MT and vice versa
  const convertWeight = (value: string, from: string, to: string) => {
    if (!value) return ""
    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return ""

    if (from === "kg" && to === "mt") {
      return (numValue / 1000).toString()
    } else if (from === "mt" && to === "kg") {
      return (numValue * 1000).toString()
    }
    return value
  }

  // Handle weight unit change
  const handleWeightUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value
    const oldUnit = formData.weightUnit
    const convertedValue = convertWeight(formData.weightValue, oldUnit, newUnit)

    setFormData((prev) => ({
      ...prev,
      weightUnit: newUnit,
      weightValue: convertedValue,
    }))
  }

  // Convert USD to IDR and vice versa (using a fixed exchange rate for demo)
  const exchangeRate = 15500 // 1 USD = 15,500 IDR (example rate)

  const convertCurrency = (value: string, from: string, to: string) => {
    if (!value) return ""
    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return ""

    if (from === "USD" && to === "IDR") {
      return Math.round(numValue * exchangeRate).toString()
    } else if (from === "IDR" && to === "USD") {
      return (numValue / exchangeRate).toFixed(2)
    }
    return value
  }

  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value
    const oldCurrency = formData.budgetCurrency
    const convertedValue = convertCurrency(formData.budgetValue, oldCurrency, newCurrency)

    setFormData((prev) => ({
      ...prev,
      budgetCurrency: newCurrency,
      budgetValue: convertedValue,
    }))
  }

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare final form data
    const finalCargoType = formData.cargoType === "Other" ? formData.cargoTypeOther : formData.cargoType

    // In a real app, you would submit the form data to your backend
    console.log("Submitting form with data:", {
      ...formData,
      cargoType: finalCargoType,
    })

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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

      {/* Navigation */}
      <Navigation />

      {/* Vessel Booking Form */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Vessel Booking Form</h1>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white/70 backdrop-blur-sm rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="company" className="flex items-center text-black text-lg mb-2">
                  <Package className="mr-2 h-5 w-5" />
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [&::placeholder]:text-white/70 [color-scheme:light]"
                  placeholder="Your company name"
                  required
                />
              </div>

              <div>
                <label htmlFor="cargoType" className="flex items-center text-black text-lg mb-2">
                  <Package className="mr-2 h-5 w-5" />
                  Cargo Type
                </label>
                <select
                  id="cargoType"
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  required
                >
                  <option value="" disabled className="bg-white">
                    Select cargo type
                  </option>
                  {cargoTypes.map((type) => (
                    <option key={type} value={type} className="bg-white">
                      {type}
                    </option>
                  ))}
                </select>

                {formData.cargoType === "Other" && (
                  <input
                    type="text"
                    id="cargoTypeOther"
                    name="cargoTypeOther"
                    value={formData.cargoTypeOther}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [&::placeholder]:text-white/70 [color-scheme:light]"
                    placeholder="Specify cargo type"
                    required
                  />
                )}
              </div>

              <div>
                <label htmlFor="weightValue" className="flex items-center text-black text-lg mb-2">
                  <Weight className="mr-2 h-5 w-5" />
                  Cargo Weight
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="weightValue"
                    name="weightValue"
                    value={formData.weightValue}
                    onChange={handleChange}
                    min="0.001"
                    step="0.001"
                    className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [&::placeholder]:text-white/70 [color-scheme:light]"
                    placeholder="Enter weight"
                    required
                  />
                  <select
                    id="weightUnit"
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleWeightUnitChange}
                    className="w-24 px-2 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  >
                    <option value="kg" className="bg-white">
                      kg
                    </option>
                    <option value="mt" className="bg-white">
                      MT
                    </option>
                  </select>
                </div>
                <p className="text-gray-600 text-xs mt-1">
                  {formData.weightUnit === "kg"
                    ? `${formData.weightValue ? (Number.parseFloat(formData.weightValue) / 1000).toFixed(3) : "0.000"} MT`
                    : `${formData.weightValue ? (Number.parseFloat(formData.weightValue) * 1000).toFixed(0) : "0"} kg`}
                </p>
              </div>

              <div>
                <label htmlFor="vesselSize" className="flex items-center text-black text-lg mb-2">
                  <Anchor className="mr-2 h-5 w-5" />
                  Vessel Size
                </label>
                <select
                  id="vesselSize"
                  name="vesselSize"
                  value={formData.vesselSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  required
                >
                  <option value="small" className="bg-white">
                    Small (up to 10,000 DWT)
                  </option>
                  <option value="medium" className="bg-white">
                    Medium (10,000 - 50,000 DWT)
                  </option>
                  <option value="large" className="bg-white">
                    Large (50,000 - 100,000 DWT)
                  </option>
                  <option value="vlcc" className="bg-white">
                    Very Large (100,000+ DWT)
                  </option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="pol" className="flex items-center text-black text-lg mb-2">
                  <MapPin className="mr-2 h-5 w-5" />
                  Port of Loading (POL)
                </label>
                <select
                  id="pol"
                  name="pol"
                  value={formData.pol}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  required
                >
                  <option value="" disabled className="bg-white">
                    Select port of loading
                  </option>
                  <optgroup label="Indonesian Ports" className="bg-white">
                    {indonesianPorts.map((port) => (
                      <option key={port} value={port} className="bg-white">
                        {port}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="International Ports" className="bg-white">
                    {internationalPorts.map((port) => (
                      <option key={port} value={port} className="bg-white">
                        {port}
                      </option>
                    ))}
                  </optgroup>
                  <option value="other" className="bg-white">
                    Other (specify in notes)
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="pod" className="flex items-center text-black text-lg mb-2">
                  <MapPin className="mr-2 h-5 w-5" />
                  Port of Discharge (POD)
                </label>
                <select
                  id="pod"
                  name="pod"
                  value={formData.pod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  required
                >
                  <option value="" disabled className="bg-white">
                    Select port of discharge
                  </option>
                  <optgroup label="Indonesian Ports" className="bg-white">
                    {indonesianPorts.map((port) => (
                      <option key={port} value={port} className="bg-white">
                        {port}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="International Ports" className="bg-white">
                    {internationalPorts.map((port) => (
                      <option key={port} value={port} className="bg-white">
                        {port}
                      </option>
                    ))}
                  </optgroup>
                  <option value="other" className="bg-white">
                    Other (specify in notes)
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="duration" className="flex items-center text-black text-lg mb-2">
                  <Clock className="mr-2 h-5 w-5" />
                  Duration (days)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [&::placeholder]:text-white/70 [color-scheme:light]"
                  placeholder="Number of days required"
                  required
                />
              </div>

              <div>
                <label htmlFor="budgetValue" className="flex items-center text-black text-lg mb-2">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Budget
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="budgetValue"
                    name="budgetValue"
                    value={formData.budgetValue}
                    onChange={handleChange}
                    min="1"
                    className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [&::placeholder]:text-white/70 [color-scheme:light]"
                    placeholder="Enter budget amount"
                    required
                  />
                  <select
                    id="budgetCurrency"
                    name="budgetCurrency"
                    value={formData.budgetCurrency}
                    onChange={handleCurrencyChange}
                    className="w-24 px-2 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  >
                    <option value="USD" className="bg-white">
                      USD
                    </option>
                    <option value="IDR" className="bg-white">
                      IDR
                    </option>
                  </select>
                </div>
                <p className="text-gray-600 text-xs mt-1">
                  {formData.budgetCurrency === "USD"
                    ? `≈ IDR ${formData.budgetValue ? (Number.parseFloat(formData.budgetValue) * exchangeRate).toLocaleString("id-ID") : "0"}`
                    : `≈ USD ${formData.budgetValue ? (Number.parseFloat(formData.budgetValue) / exchangeRate).toFixed(2) : "0.00"}`}
                </p>
              </div>
            </div>
          </div>

          {/* Laycan Date */}
          <div className="mt-6">
            <label htmlFor="laycanDate" className="flex items-center text-black text-lg mb-2">
              <Calendar className="mr-2 h-5 w-5" />
              Laycan Date (Earliest Loading Date)
            </label>
            <input
              type="date"
              id="laycanDate"
              name="laycanDate"
              value={formData.laycanDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Today's date as minimum
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
              required
            />
          </div>

          {/* Additional Notes */}
          <div className="mt-6">
            <label htmlFor="notes" className="flex items-center text-black text-lg mb-2">
              <Info className="mr-2 h-5 w-5" />
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [&::placeholder]:text-white/70 [color-scheme:light]"
              placeholder="Specify any special requirements, custom ports, or additional information needed for your shipment"
            ></textarea>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6">
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 mr-2" required />
              <label htmlFor="terms" className="text-black text-sm">
                I agree to the{" "}
                <a href="#" className="underline">
                  terms and conditions
                </a>{" "}
                of shipping and understand that all bookings are subject to vessel availability and confirmation.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-[#3498db] text-white px-8 py-3 rounded-md font-medium hover:bg-[#2980b9] transition"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
