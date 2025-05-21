"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut, ChevronDown, Ship, Truck, BarChart3, Menu, X } from "lucide-react"
import Cookies from "js-cookie"

export default function Navigation() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [cargoDropdownOpen, setCargoDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCargoDDOpen, setMobileCargoDDOpen] = useState(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const cargoDropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Check login status when component mounts or when the page is focused
  const checkLoginStatus = () => {
    const loggedIn = Cookies.get("isLoggedIn") === "true"
    const email = Cookies.get("userEmail") || ""
    const name = Cookies.get("userName") || ""
    setIsLoggedIn(loggedIn)
    setUserEmail(email)
    setUserName(name)
  }

  useEffect(() => {
    checkLoginStatus()

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

    // Add focus event listener to check login status when tab is focused
    window.addEventListener("focus", checkLoginStatus)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("focus", checkLoginStatus)
    }
  }, [])

  // Handle window resize to close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [mobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default behavior

    // Clear user data from cookies
    Cookies.remove("isLoggedIn")
    Cookies.remove("userEmail")
    Cookies.remove("userName")

    // Update component state
    setIsLoggedIn(false)
    setUserEmail("")
    setUserName("")
    setUserDropdownOpen(false)
    setMobileMenuOpen(false)

    // Force a hard navigation to the home page to ensure a complete refresh
    window.location.href = "/"
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

  const toggleMobileCargoDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    setMobileCargoDDOpen(!mobileCargoDDOpen)
  }

  return (
    <div className="relative z-10 container mx-auto px-4 py-3 sm:py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logerchain Logo"
              width={320}
              height={80}
              className="h-12 w-auto sm:h-16 md:h-20"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
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
                <span className="hidden lg:inline">{userName || userEmail.split("@")[0]}</span>
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
            <>
              {/* Don't show Sign In button on sign-in and sign-up pages */}
              {typeof window !== "undefined" &&
                !window.location.pathname.includes("/signin") &&
                !window.location.pathname.includes("/signup") && (
                  <Link href="/signin" className="bg-white text-[#263238] px-4 py-2 rounded-md hover:bg-white/90">
                    Sign in
                  </Link>
                )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            ref={mobileMenuRef}
            className="absolute right-0 top-0 h-full w-64 bg-[#263238] p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-xl font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white py-2 border-b border-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/product"
                className="text-white py-2 border-b border-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/about"
                className="text-white py-2 border-b border-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard/analytics"
                    className="flex items-center text-white py-2 border-b border-white/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    <span>Analytics Dashboard</span>
                  </Link>

                  <div className="py-2 border-b border-white/20">
                    <button
                      onClick={toggleMobileCargoDropdown}
                      className="flex items-center justify-between w-full text-white"
                    >
                      <span>My Cargo</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${mobileCargoDDOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileCargoDDOpen && (
                      <div className="mt-2 pl-4 flex flex-col space-y-2">
                        <Link
                          href="/product/vessel/tracking"
                          className="flex items-center text-white/80 py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Ship className="mr-2 h-4 w-4" />
                          <span>Ship</span>
                        </Link>
                        <Link
                          href="/product/trucking/info"
                          className="flex items-center text-white/80 py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Truck className="mr-2 h-4 w-4" />
                          <span>Truck</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  <button onClick={handleSignOut} className="flex items-center text-white py-2">
                    <LogOut className="mr-2 h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Don't show Sign In button on sign-in and sign-up pages */}
                  {typeof window !== "undefined" &&
                    !window.location.pathname.includes("/signin") &&
                    !window.location.pathname.includes("/signup") && (
                      <Link
                        href="/signin"
                        className="bg-white text-[#263238] px-4 py-2 rounded-md text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                    )}
                </>
              )}
            </nav>

            <div className="absolute bottom-8 left-5 right-5">
              <div className="text-white/50 text-sm">
                <p>© 2023 Logerchain</p>
                <p className="mt-1">Blockchain Logistics Solutions</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
