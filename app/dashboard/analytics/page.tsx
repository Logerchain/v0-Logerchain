"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, TrendingUp, DollarSign, Package, Clock, ExternalLink } from "lucide-react"
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

export default function AnalyticsDashboard() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

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

      {/* Analytics Dashboard Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="bg-white/90 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#3498db]">
              <div className="flex items-center">
                <div className="bg-[#3498db]/10 p-3 rounded-full mr-3">
                  <Package className="h-6 w-6 text-[#3498db]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Shipments</p>
                  <p className="text-2xl font-bold">248</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">12% increase</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#2ecc71]">
              <div className="flex items-center">
                <div className="bg-[#2ecc71]/10 p-3 rounded-full mr-3">
                  <DollarSign className="h-6 w-6 text-[#2ecc71]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold">$24,500</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">8% increase</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#f39c12]">
              <div className="flex items-center">
                <div className="bg-[#f39c12]/10 p-3 rounded-full mr-3">
                  <Clock className="h-6 w-6 text-[#f39c12]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. Delivery Time</p>
                  <p className="text-2xl font-bold">3.2 days</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">5% faster</span>
                <span className="text-gray-500 ml-1">than last month</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#e74c3c]">
              <div className="flex items-center">
                <div className="bg-[#e74c3c]/10 p-3 rounded-full mr-3">
                  <BarChart3 className="h-6 w-6 text-[#e74c3c]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Shipments</p>
                  <p className="text-2xl font-bold">42</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">15% increase</span>
                <span className="text-gray-500 ml-1">from last week</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Shipment Volume</h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Shipment volume chart will appear here</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Revenue breakdown chart will appear here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Shipments with Blockchain Transactions */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Shipments</h2>
              <div className="flex items-center text-sm text-purple-600">
                <span className="mr-1">Powered by Solana Blockchain</span>
                <Image src="/images/solana-logo.png" alt="Solana Logo" width={20} height={20} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ETA
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blockchain Transaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#SH-1234</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Ship</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Jakarta, Indonesia → Singapore
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Transit
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2023</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span className="text-purple-600 font-mono text-xs truncate w-24">5UygfKB...j7HgTY</span>
                        <Link
                          href="https://explorer.solana.com/tx/5UygfKBcEy8KBNxCKAYme9xyH3QF5NQ8C7Cz3mQXj7HgTY"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#TR-5678</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Truck</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Bandung, Indonesia → Jakarta, Indonesia
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Loading
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Jan 12, 2023</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span className="text-purple-600 font-mono text-xs truncate w-24">9pWjV7R...kL4mNp</span>
                        <Link
                          href="https://explorer.solana.com/tx/9pWjV7RhQyJVzgJ2WdPBhNzyRzU8Lm5hxFXkL4mNp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#SH-9012</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Ship</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Singapore → Jakarta, Indonesia
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Scheduled
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Jan 20, 2023</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span className="text-purple-600 font-mono text-xs truncate w-24">3vQxP8D...t2RgZs</span>
                        <Link
                          href="https://explorer.solana.com/tx/3vQxP8DfG5LyW9PqHvAKmS7DZNQt2RgZs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#TR-3456</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Truck</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Jakarta, Indonesia → Surabaya, Indonesia
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Transit
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Jan 14, 2023</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span className="text-purple-600 font-mono text-xs truncate w-24">7mHgTyU...p9KvBn</span>
                        <Link
                          href="https://explorer.solana.com/tx/7mHgTyUiLcRxJfWqYZp9KvBn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link href="/dashboard/transactions" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all transactions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
