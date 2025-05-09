import React from 'react'

export default function Subscribe() {
  return (
    <section className="py-12 bg-green-50 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay in the Loop</h2>
        <p className="text-gray-600 mb-6">Subscribe for updates, offers, and skin care tips.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full sm:w-auto flex-1 px-4 py-2 border rounded-md"
          />
          <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}