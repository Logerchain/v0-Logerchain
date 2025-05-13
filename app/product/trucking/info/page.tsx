"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Truck } from "lucide-react"
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

export default function TruckInfo() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  // Mock order data
  const orderData = {
    customer: {
      name: "Suman Modi",
      address: "1456 Veltri Drive,\nAnchorage, AK 99502",
    },
    barcode: "9854565656256456",
    shipping: {
      company: "Ecome Express",
    },
    order: {
      name: "Electronics Shipment",
      sku: "#TR78452568",
      type: "Box Truck",
      date: "24/12/2022",
      weight: "1200 kg",
      id: "#TR78452568",
      distance: "450 km",
      estimatedArrival: "26/12/2022",
    },
    items: [
      {
        description: "Transportation Fee",
        price: "$459",
        qty: "1",
        gstn: "18%",
        discount: "-₹0.00",
        total: "$459",
      },
      {
        description: "Loading/Unloading",
        price: "$120",
        qty: "1",
        gstn: "18%",
        discount: "-₹0.00",
        total: "$120",
      },
    ],
    total: "$579",
    from: {
      company: "AJX Electronics",
      address: "1456 Pondok Labu,\nJakarta, Indonesia",
    },
    to: {
      name: "Suman Modi",
      address: "1456 Veltri Drive,\nBandung, Indonesia",
    },
    note: "Please handle with care. Contains fragile electronic equipment. Driver should call 30 minutes before arrival.",
  }

  // Handle back button click
  const handleBackClick = () => {
    router.push("/product/trucking")
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

      {/* Truck Info Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column - Input Fields */}
          <div className="md:col-span-4">
            <div className="space-y-8">
              <div>
                <label htmlFor="cargoName" className="block text-white text-xl font-bold mb-2">
                  Cargo Name
                </label>
                <input
                  type="text"
                  id="cargoName"
                  className="w-full px-4 py-3 bg-white/90 rounded-md focus:outline-none"
                  defaultValue="Electronics Shipment"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="truckType" className="block text-white text-xl font-bold mb-2">
                  Truck Type
                </label>
                <input
                  type="text"
                  id="truckType"
                  className="w-full px-4 py-3 bg-white/90 rounded-md focus:outline-none"
                  defaultValue="Box Truck - 8 Ton"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Middle Column - Order Details */}
          <div className="md:col-span-5">
            <div className="bg-white/90 rounded-lg p-4">
              {/* Header */}
              <div className="flex justify-between mb-4">
                <div>
                  <div className="font-bold">Ordered By</div>
                  <div className="text-lg font-bold">{orderData.customer.name}</div>
                  <div className="text-sm whitespace-pre-line">{orderData.customer.address}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{orderData.shipping.company}</div>
                  <div className="mt-2">
                    <div className="text-xs text-center mb-1">Barcode</div>
                    <div className="bg-white p-1">
                      <div className="h-8 w-32 bg-[url('/generic-barcode.png')]"></div>
                      <div className="text-xs text-center">{orderData.barcode}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="border-t border-b border-gray-300 py-2 mb-4">
                <div className="font-bold mb-2">Order Details</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div className="flex">
                    <span className="w-24">Cargo :</span>
                    <span>{orderData.order.name}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Weight :</span>
                    <span>{orderData.order.weight}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Order ID :</span>
                    <span>{orderData.order.sku}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Distance :</span>
                    <span>{orderData.order.distance}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Truck Type :</span>
                    <span>{orderData.order.type}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">ETA :</span>
                    <span>{orderData.order.estimatedArrival}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Order Date :</span>
                    <span>{orderData.order.date}</span>
                  </div>
                </div>
              </div>

              {/* Price Table */}
              <div className="mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-1">Description</th>
                      <th className="text-right py-1">Price</th>
                      <th className="text-right py-1">Qty</th>
                      <th className="text-right py-1">GSTN</th>
                      <th className="text-right py-1">Discount</th>
                      <th className="text-right py-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2">{item.description}</td>
                        <td className="text-right py-2">{item.price}</td>
                        <td className="text-right py-2">{item.qty}</td>
                        <td className="text-right py-2">{item.gstn}</td>
                        <td className="text-right py-2">{item.discount}</td>
                        <td className="text-right py-2 font-bold">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5} className="text-right py-2 font-bold">
                        Total
                      </td>
                      <td className="text-right py-2 font-bold">{orderData.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Shipping Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-bold mb-1">From</div>
                  <div className="font-bold">{orderData.from.company}</div>
                  <div className="text-sm whitespace-pre-line">{orderData.from.address}</div>
                </div>
                <div>
                  <div className="font-bold mb-1">Delivered To</div>
                  <div className="font-bold">{orderData.to.name}</div>
                  <div className="text-sm whitespace-pre-line">{orderData.to.address}</div>
                </div>
              </div>

              {/* Note */}
              <div>
                <div className="font-bold mb-1">Note</div>
                <div className="text-sm">{orderData.note}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Map and Terms */}
          <div className="md:col-span-3">
            <div className="space-y-6">
              {/* Truck Image */}
              <div className="bg-white/90 rounded-lg p-2">
                <div className="aspect-square relative">
                  <div className="flex items-center justify-center h-full">
                    <Truck size={120} className="text-[#f39c12]" />
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white/90 rounded-lg p-2">
                <div className="aspect-square relative">
                  <Image src="/images/indonesia-map.jpg" alt="Truck Route Map" fill className="object-cover rounded" />
                  {/* Route line */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-1 bg-[#f39c12] relative">
                      {/* Origin dot */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                      {/* Truck position */}
                      <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2">
                        <Truck size={16} className="text-[#f39c12]" />
                      </div>
                      {/* Destination dot */}
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white/90 rounded-lg p-4">
                <div className="space-y-3">
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
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleBackClick}
            className="bg-gray-500/80 hover:bg-gray-600 text-white px-8 py-3 rounded-md font-medium transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
