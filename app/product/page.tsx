import Image from "next/image"
import Link from "next/link"
import { Ship, Truck, MoreHorizontal } from "lucide-react"
import Navigation from "@/components/navigation"

export default function Product() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Product Categories */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Vessel - Now links directly to booking form */}
            <Link href="/product/vessel/booking" className="group">
              <div className="bg-white/90 rounded-full py-3 px-6 flex items-center w-full md:w-64 transition-transform transform hover:scale-105">
                <div className="bg-[#3498db] rounded-full p-3 mr-4">
                  <Ship className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-semibold text-[#263238]">Vessel</span>
              </div>
            </Link>

            {/* Trucking */}
            <Link href="/product/trucking" className="group">
              <div className="bg-white/90 rounded-full py-3 px-6 flex items-center w-full md:w-64 transition-transform transform hover:scale-105">
                <div className="bg-[#f39c12] rounded-full p-3 mr-4">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-semibold text-[#263238]">Trucking</span>
              </div>
            </Link>

            {/* Others */}
            <Link href="/product/others" className="group">
              <div className="bg-white/90 rounded-full py-3 px-6 flex items-center w-full md:w-64 transition-transform transform hover:scale-105">
                <div className="bg-[#e74c3c] rounded-full p-3 mr-4">
                  <MoreHorizontal className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-semibold text-[#263238]">Others</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* AI and ? icons at bottom corners */}
      <div className="relative z-10 container mx-auto px-4 pb-6 mt-auto">
        <div className="flex justify-between">
          <div className="text-white text-xl font-bold">AI</div>
          <div className="text-white text-xl font-bold">?</div>
        </div>
      </div>
    </div>
  )
}
