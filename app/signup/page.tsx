"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"

export default function SignUp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  // Get the redirect URL from query parameters
  const redirectUrl = searchParams.get("redirect") || "/"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email) {
      setError("Please enter your email")
      return
    }

    // Mock signup - in a real app, this would call an API
    // Set cookies instead of localStorage for better security
    Cookies.set("isLoggedIn", "true", { expires: 7 }) // Expires in 7 days
    Cookies.set("userEmail", email, { expires: 7 })

    // Redirect to the original destination or home page
    router.push(redirectUrl)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

      {/* Navigation */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logerchain Logo" width={320} height={80} className="h-20 w-auto" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-white/80">
              Home
            </Link>
            <Link href="/product" className="text-white hover:text-white/80">
              Product
            </Link>
            <Link href="/about" className="text-white hover:text-white/80">
              About
            </Link>
            <Link href="/signin" className="bg-white text-[#263238] px-4 py-2 rounded-md hover:bg-white/90">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4">
          <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>

          <p className="text-center mb-6">
            Already have an account?{" "}
            <Link
              href={`/signin?redirect=${encodeURIComponent(redirectUrl)}`}
              className="text-[#4285f4] hover:underline"
            >
              Sign In
            </Link>
          </p>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285f4]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#171717] text-white py-3 rounded-md hover:bg-[#333333] transition"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-4">Or continue with</p>

            <button className="flex items-center justify-center mx-auto p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
              <Image src="/images/google-logo.png" alt="Google" width={24} height={24} />
            </button>

            <button className="mt-6 text-gray-500 hover:text-gray-700">Show more</button>
          </div>
        </div>
      </div>
    </div>
  )
}
