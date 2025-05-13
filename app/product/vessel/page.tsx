import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/navigation"

export default function VesselProduct() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Vessel Product Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="bg-white/90 rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Vessel Management</h1>
          <p className="mb-4">
            Our vessel management solution provides real-time monitoring and management of your entire fleet. Using
            blockchain technology, we ensure secure and transparent record-keeping for all vessel operations.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">Key Features:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Real-time vessel tracking and monitoring</li>
            <li>Maintenance scheduling and history</li>
            <li>Crew management and certification tracking</li>
            <li>Fuel consumption optimization</li>
            <li>Regulatory compliance documentation</li>
            <li>Secure blockchain-based record keeping</li>
          </ul>
          <div className="mt-8 flex gap-4">
            <Link
              href="/contact"
              className="bg-[#3498db] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2980b9] transition"
            >
              Request a Demo
            </Link>
            <Link
              href="/product/vessel/booking"
              className="bg-[#2ecc71] text-white px-6 py-3 rounded-md font-medium hover:bg-[#27ae60] transition"
            >
              Book a Vessel
            </Link>
          </div>
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
  )
}
