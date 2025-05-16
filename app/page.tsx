import Image from "next/image"
import Link from "next/link"
import { Clock, Shield, Ship } from "lucide-react"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Ocean Background */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

        {/* Navigation */}
        <Navigation />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-48">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Revolutionizing Global Logistics with Blockchain
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Secure, transparent, and efficient shipping solutions for the modern supply chain
            </p>
            <Link
              href="/product"
              className="inline-block bg-white text-[#263238] px-6 py-3 rounded-md font-medium hover:bg-white/90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* AI and ? icons at bottom corners */}
        <div className="relative z-10 container mx-auto px-4 pb-6">
          <div className="flex justify-between">
            <div className="text-white text-xl font-bold">AI</div>
            <div className="text-white text-xl font-bold">?</div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Key features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full border-2 border-[#263238] inline-flex">
                  <Clock size={48} className="text-[#263238]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Real Time Tracking</h3>
              <p className="text-[#717171] text-sm">
                Our membership management software provides full automation of membership renewals and payments
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full border-2 border-[#263238] inline-flex">
                  <Shield size={48} className="text-[#263238]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Smart Contract</h3>
              <p className="text-[#717171] text-sm">
                Our membership management software provides full automation of membership renewals and payments
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full border-2 border-[#263238] inline-flex">
                  <Ship size={48} className="text-[#263238]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">IOT Integration</h3>
              <p className="text-[#717171] text-sm">
                Our membership management software provides full automation of membership renewals and payments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Transform Section */}
      <div className="py-16 bg-[#ffeded]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ready to transforms your logistic?</h2>
              <p className="text-[#4d4d4d] mb-4">
                Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa
                nunc varius arcu, at scelerisque elit erat a magna.
              </p>
              <p className="text-[#4d4d4d] mb-6">
                Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst.
              </p>
              <Link
                href="/contact"
                className="bg-white text-[#263238] px-6 py-3 rounded-md font-medium border border-[#263238] hover:bg-gray-50 transition"
              >
                Contact us
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Vessel Fleet</h3>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/images/vessel-ship.png"
                  alt="Cargo vessel ship"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
