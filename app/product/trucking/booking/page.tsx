"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Weight, Package, Truck, MapPin, Calendar } from "lucide-react"
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

// Common cargo types for trucking
const cargoTypes = [
  "General Cargo",
  "Bulk Cargo",
  "Container Cargo",
  "Liquid Bulk",
  "Refrigerated Goods",
  "Hazardous Materials",
  "Construction Materials",
  "Agricultural Products",
  "Electronics",
  "Furniture",
  "Automotive Parts",
  "Other",
]

// Truck types
const truckTypes = [
  "Box Truck",
  "Flatbed Truck",
  "Refrigerated Truck",
  "Tanker Truck",
  "Dump Truck",
  "Semi-Trailer",
  "Container Truck",
  "Car Carrier",
  "Tipper Truck",
  "Curtain Sider",
  "Other",
]

// Common Indonesian cities
const indonesianCities = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Semarang",
  "Makassar",
  "Palembang",
  "Balikpapan",
  "Yogyakarta",
  "Denpasar",
  "Malang",
  "Padang",
  "Manado",
  "Banjarmasin",
  "Pontianak",
]

export default function TruckingBooking() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  // Form state
  const [formData, setFormData] = useState({
    company: "",
    cargoType: "",
    cargoTypeOther: "",
    weightValue: "",
    weightUnit: "kg",
    truckType: "",
    truckTypeOther: "",
    pickupLocation: "",
    pickupLocationOther: "",
    deliveryLocation: "",
    deliveryLocationOther: "",
    pickupDate: "",
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

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare final form data
    const finalCargoType = formData.cargoType === "Other" ? formData.cargoTypeOther : formData.cargoType
    const finalTruckType = formData.truckType === "Other" ? formData.truckTypeOther : formData.truckType
    const finalPickupLocation =
      formData.pickupLocation === "Other" ? formData.pickupLocationOther : formData.pickupLocation
    const finalDeliveryLocation =
      formData.deliveryLocation === "Other" ? formData.deliveryLocationOther : formData.deliveryLocation

    // In a real app, you would submit the form data to your backend
    console.log("Submitting form with data:", {
      ...formData,
      cargoType: finalCargoType,
      truckType: finalTruckType,
      pickupLocation: finalPickupLocation,
      deliveryLocation: finalDeliveryLocation,
    })

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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

      {/* Navigation */}
      <Navigation />

      {/* Trucking Booking Form */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Truck Booking Form</h1>

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
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
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
                    className="w-full mt-2 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
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
                    className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
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
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="truckType" className="flex items-center text-black text-lg mb-2">
                  <Truck className="mr-2 h-5 w-5" />
                  Truck Type
                </label>
                <select
                  id="truckType"
                  name="truckType"
                  value={formData.truckType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  required
                >
                  <option value="" disabled className="bg-white">
                    Select truck type
                  </option>
                  {truckTypes.map((type) => (
                    <option key={type} value={type} className="bg-white">
                      {type}
                    </option>
                  ))}
                </select>

                {formData.truckType === "Other" && (
                  <input
                    type="text"
                    id="truckTypeOther"
                    name="truckTypeOther"
                    value={formData.truckTypeOther}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                    placeholder="Specify truck type"
                    required
                  />
                )}
              </div>

              <div>
                <label htmlFor="pickupLocation" className="flex items-center text-black text-lg mb-2">
                  <MapPin className="mr-2 h-5 w-5" />
                  Pickup Location
                </label>
                <select
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  required
                >
                  <option value="" disabled className="bg-white">
                    Select pickup location
                  </option>
                  {indonesianCities.map((city) => (
                    <option key={city} value={city} className="bg-white">
                      {city}
                    </option>
                  ))}
                  <option value="Other" className="bg-white">
                    Other
                  </option>
                </select>

                {formData.pickupLocation === "Other" && (
                  <input
                    type="text"
                    id="pickupLocationOther"
                    name="pickupLocationOther"
                    value={formData.pickupLocationOther}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                    placeholder="Specify pickup location"
                    required
                  />
                )}
              </div>

              <div>
                <label htmlFor="deliveryLocation" className="flex items-center text-black text-lg mb-2">
                  <MapPin className="mr-2 h-5 w-5" />
                  Delivery Location
                </label>
                <select
                  id="deliveryLocation"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                  required
                >
                  <option value="" disabled className="bg-white">
                    Select delivery location
                  </option>
                  {indonesianCities.map((city) => (
                    <option key={city} value={city} className="bg-white">
                      {city}
                    </option>
                  ))}
                  <option value="Other" className="bg-white">
                    Other
                  </option>
                </select>

                {formData.deliveryLocation === "Other" && (
                  <input
                    type="text"
                    id="deliveryLocationOther"
                    name="deliveryLocationOther"
                    value={formData.deliveryLocationOther}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
                    placeholder="Specify delivery location"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          {/* Pickup Date */}
          <div className="mt-6">
            <label htmlFor="pickupDate" className="flex items-center text-black text-lg mb-2">
              <Calendar className="mr-2 h-5 w-5" />
              Pickup Date
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Today's date as minimum
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
              required
            />
          </div>

          {/* Additional Notes */}
          <div className="mt-6">
            <label htmlFor="notes" className="flex items-center text-black text-lg mb-2">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 [color-scheme:light]"
              placeholder="Specify any special requirements or additional information needed for your shipment"
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
                of trucking services and understand that all bookings are subject to truck availability and
                confirmation.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-[#f39c12] text-white px-8 py-3 rounded-md font-medium hover:bg-[#e67e22] transition"
            >
              Book Truck
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
