import React from 'react'

export default function Hero() {
  return (
    <section className="w-screen bg-white px-4 lg:px-8 py-12">
      <div className="w-full">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900">
          <span className="block">Handmade,</span>
          <span className="block text-green-600">Sustainable Soaps</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Discover our collection of eco‑friendly, natural soaps made with love and care for your skin and the environment.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/shop"
            className="px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Shop Now
          </a>
          <a
            href="#featured"
            className="px-6 py-3 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
          >
            View Featured
          </a>
        </div>
      </div>
    </section>
  )
}
