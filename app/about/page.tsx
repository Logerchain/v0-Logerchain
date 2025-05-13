import Image from "next/image"
import { Lightbulb, Eye, Leaf, Users } from "lucide-react"
import Navigation from "@/components/navigation"

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Ocean Background */}
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
        </div>

        {/* Navigation */}
        <Navigation />

        {/* About Us Content */}
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg p-8">
            <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
            <p className="text-white text-lg leading-relaxed">
              Founded in 2023, Logerchain is pioneering the integration of blockchain technology with global logistics.
              Our mission is to create a more efficient, transparent, and secure transportation ecosystem through
              decentralized solutions and cutting-edge technology across logistics, ground, and Others operation
            </p>
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

      {/* Our Value Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Value</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Value 1: Innovation */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-[#e8f5e9] inline-flex">
                  <Lightbulb size={32} className="text-[#103e13]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-[#717171] text-sm">
                Our membership management software provides full automation of membership renewals and payments
              </p>
            </div>

            {/* Value 2: Transparency */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-[#e8f5e9] inline-flex">
                  <Eye size={32} className="text-[#103e13]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-[#717171] text-sm">
                Our membership management software provides full automation of membership renewals and payments
              </p>
            </div>

            {/* Value 3: Sustainability */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-[#e8f5e9] inline-flex">
                  <Leaf size={32} className="text-[#103e13]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-[#717171] text-sm">
                Our membership management software provides full automation of membership renewals and payments
              </p>
            </div>

            {/* Value 4: Collaboration */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-[#e8f5e9] inline-flex">
                  <Users size={32} className="text-[#103e13]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Collabortion</h3>
              <p className="text-[#717171] text-sm">
                Our membership management software provides full automation of membership renewals and payments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our story</h2>
            <p className="text-lg leading-relaxed">
              Logerchain was born from a simple observation: the logistics industry, despite being the backbone of
              global trade, was lagging in technological innovation. Our founders, with decades of experience in
              transportation and technology, set out to bridge this gap.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
