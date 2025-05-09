// src/components/FeaturedProducts.jsx
import React from 'react'

export default function FeaturedProducts() {
  return (
    <section id="featured" className="w-full bg-white py-12">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Featured Soaps
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 lg:px-12">
        {[1,2,3,4,5,6,7,8].map(n => (
          <div key={n} className="border rounded-lg p-6 flex flex-col">
            <div className="h-48 bg-gray-100 mb-4 w-full"></div>
            <h3 className="font-semibold mb-2">Soap {n}</h3>
            <p className="text-gray-500 mb-4 flex-1">
              Natural ingredients for healthy skin.
            </p>
            <button className="mt-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
