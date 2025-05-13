import Image from "next/image"
import Navigation from "@/components/navigation"

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ocean-ship.jpg" alt="Ocean view with cargo ship" fill className="object-cover" priority />
      </div>

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
