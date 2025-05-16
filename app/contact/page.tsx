import Image from "next/image"
import Navigation from "@/components/navigation"

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

      {/* Navigation */}
      <Navigation />

      {/* Contact Form */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-12">Contact Us</h1>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white text-lg mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-white text-lg mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-lg mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <div>
              <label htmlFor="question" className="block text-white text-lg mb-2">
                Question
              </label>
              <textarea
                id="question"
                rows={5}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              ></textarea>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-white text-[#263238] px-8 py-3 rounded-full font-medium hover:bg-white/90 transition"
              >
                Sent
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Vessel Fleet Section */}
      <div className="relative z-10 container mx-auto px-4 py-12 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Vessel Fleet</h2>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Vessel Image */}
              <div className="relative h-64 md:h-auto">
                <Image src="/images/cargo-vessel.jpg" alt="PACNAV Cargo Vessel" fill className="object-cover" />
              </div>

              {/* Vessel Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#263238] mb-4">PACNAV Bulk Carrier</h3>

                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-semibold text-[#263238] w-1/3">Vessel Type</td>
                      <td className="py-2 text-gray-700">Bulk Carrier</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-semibold text-[#263238]">Built</td>
                      <td className="py-2 text-gray-700">2018</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-semibold text-[#263238]">Length</td>
                      <td className="py-2 text-gray-700">225 meters</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-semibold text-[#263238]">Deadweight</td>
                      <td className="py-2 text-gray-700">82,000 DWT</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-semibold text-[#263238]">Flag</td>
                      <td className="py-2 text-gray-700">Panama</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#263238]">Status</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Available
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6">
                  <button className="bg-[#263238] text-white px-6 py-2 rounded-md hover:bg-[#1a2327] transition">
                    Request Charter
                  </button>
                </div>
              </div>
            </div>
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
