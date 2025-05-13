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

export default function ShipDetails() {
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
      name: "Product name",
      sku: "#56452568",
      color: "Vivid blue",
      date: "24/12/2022",
      size: "Small",
      id: "#56452568",
      quantity: "2",
      invoiceDate: "26/12/2022",
    },
    items: [
      {
        description: "Product Name",
        price: "$659",
        qty: "2",
        gstn: "18%",
        discount: "-₹0.00",
        total: "$660",
      },
      {
        description: "Other Cost",
        price: "$340",
        qty: "1",
        gstn: "18%",
        discount: "-₹0.00",
        total: "$340",
      },
    ],
    total: "$1000",
    from: {
      company: "AJX Cloths",
      address: "1456 Pondok Labu,\nAnchorage, AK 99502",
    },
    to: {
      name: "Suman Modi",
      address: "1456 Veltri Drive,\nAnchorage, AK 99502",
    },
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta.",
  }

  // Handle back button click
  const handleBackClick = () => {
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

      {/* Ship Details Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column - Input Fields */}
          <div className="md:col-span-4">
            <div className="space-y-8">
              <div>
                <label htmlFor="nameCargo" className="block text-white text-xl font-bold mb-2">
                  Name Cargo
                </label>
                <input
                  type="text"
                  id="nameCargo"
                  className="w-full px-4 py-3 bg-white/90 rounded-md focus:outline-none"
                  defaultValue="Product name"
                />
              </div>

              <div>
                <label htmlFor="barge" className="block text-white text-xl font-bold mb-2">
                  Barge
                </label>
                <input
                  type="text"
                  id="barge"
                  className="w-full px-4 py-3 bg-white/90 rounded-md focus:outline-none"
                  defaultValue="TK. SANDHEWA - 23"
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
                    <span className="w-24">Name :</span>
                    <span>{orderData.order.name}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Size :</span>
                    <span>{orderData.order.size}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">SKU :</span>
                    <span>{orderData.order.sku}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Order ID :</span>
                    <span>{orderData.order.id}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Color :</span>
                    <span>{orderData.order.color}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Quantity :</span>
                    <span>{orderData.order.quantity}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Order Date :</span>
                    <span>{orderData.order.date}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Invoice Date :</span>
                    <span>{orderData.order.invoiceDate}</span>
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
              {/* Map */}
              <div className="bg-white/90 rounded-lg p-2">
                <div className="aspect-square relative">
                  <Image
                    src="/images/indonesia-map.jpg"
                    alt="Ship Location Map"
                    fill
                    className="object-cover rounded"
                  />
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
