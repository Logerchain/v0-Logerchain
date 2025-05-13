import Image from "next/image"
import Link from "next/link"
import { FileText, Database, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation"

export default function OtherProducts() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Other Products Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="bg-white/90 rounded-lg p-8 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Supply Chain Solutions</h1>
          <p className="mb-8 text-lg">
            Beyond our core vessel and trucking solutions, Logerchain offers a comprehensive suite of supply chain
            products to optimize your logistics operations from end to end.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Smart Contracts */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#e74c3c]">
              <div className="flex items-start mb-4">
                <div className="bg-[#e74c3c]/10 p-3 rounded-full mr-4">
                  <FileText className="h-8 w-8 text-[#e74c3c]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Smart Contracts</h2>
                  <p className="text-gray-600 mb-4">
                    Automate agreements and transactions with our blockchain-based smart contracts, ensuring
                    transparency and reducing paperwork. Our contracts execute automatically when predefined conditions
                    are met.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>Automated payment releases</li>
                    <li>Conditional logistics triggers</li>
                    <li>Multi-party agreement management</li>
                    <li>Audit trail and compliance</li>
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block bg-[#e74c3c] text-white px-4 py-2 rounded-md hover:bg-[#c0392b] transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Customs Documentation */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#3498db]">
              <div className="flex items-start mb-4">
                <div className="bg-[#3498db]/10 p-3 rounded-full mr-4">
                  <Database className="h-8 w-8 text-[#3498db]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Customs Documentation</h2>
                  <p className="text-gray-600 mb-4">
                    Streamline customs clearance with our digital documentation system that ensures compliance and
                    reduces delays. Our platform handles all required paperwork for international shipping.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>Automated customs forms</li>
                    <li>Real-time compliance checking</li>
                    <li>Digital signature and verification</li>
                    <li>Customs broker integration</li>
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block bg-[#3498db] text-white px-4 py-2 rounded-md hover:bg-[#2980b9] transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Supply Chain Finance */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#f39c12]">
              <div className="flex items-start mb-4">
                <div className="bg-[#f39c12]/10 p-3 rounded-full mr-4">
                  <TrendingUp className="h-8 w-8 text-[#f39c12]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Supply Chain Finance</h2>
                  <p className="text-gray-600 mb-4">
                    Access innovative financing solutions integrated with your supply chain data, improving cash flow
                    and reducing costs. Our platform connects you with financing options based on your logistics
                    performance.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>Invoice factoring and early payment</li>
                    <li>Inventory financing</li>
                    <li>Purchase order financing</li>
                    <li>Risk-based pricing models</li>
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block bg-[#f39c12] text-white px-4 py-2 rounded-md hover:bg-[#e67e22] transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to optimize your entire supply chain?</h3>
            <Link
              href="/contact"
              className="inline-block bg-[#263238] text-white px-8 py-3 rounded-md font-medium hover:bg-[#1a2327] transition"
            >
              Contact Our Solutions Team
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
