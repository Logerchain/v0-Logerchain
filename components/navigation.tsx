"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut, ChevronDown, Ship, Truck, BarChart3 } from "lucide-react"

export default function Navigation() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [cargoDropdownOpen, setCargoDropdownOpen] = useState(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const cargoDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check login status when component mounts
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const email = localStorage.getItem("userEmail") || ""
    setIsLoggedIn(loggedIn)
    setUserEmail(email)

    // Add click event listener to close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false)
      }
      if (cargoDropdownRef.current && !cargoDropdownRef.current.contains(event.target as Node)) {
        setCargoDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    setIsLoggedIn(false)
    setUserEmail("")
    setUserDropdownOpen(false) // Close the dropdown
    // Use router instead of window.location for better Next.js integration
    router.push("/")
  }

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen)
    if (userDropdownOpen) {
      setCargoDropdownOpen(false)
    }
  }

  const toggleCargoDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCargoDropdownOpen(!cargoDropdownOpen)
  }

  return (
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

          {isLoggedIn ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={toggleUserDropdown}
                className="flex items-center text-white hover:text-white/80 focus:outline-none"
              >
                <User className="mr-2 h-5 w-5" />
                <span className="hidden lg:inline">{userEmail.split("@")[0]}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    href="/dashboard/analytics"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Analytics Dashboard</span>
                  </Link>
                  <div className="relative" ref={cargoDropdownRef}>
                    <button
                      onClick={toggleCargoDropdown}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span>My Cargo</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {cargoDropdownOpen && (
                      <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-30">
                        <Link
                          href="/product/vessel/tracking"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Ship className="mr-2 h-4 w-4" />
                          <span>Ship</span>
                        </Link>
                        <Link
                          href="/product/trucking/info"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Truck className="mr-2 h-4 w-4" />
                          <span>Truck</span>
                        </Link>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="bg-white text-[#263238] px-4 py-2 rounded-md hover:bg-white/90">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
