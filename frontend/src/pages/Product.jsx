import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// Sample product data — replace with API data later
const products = [
  {
    id: '1',
    name: 'Lavender Bliss',
    price: 8.99,
    category: 'Relaxing',
    description:
      'A soothing blend of pure lavender essential oil to calm your senses and soften skin.',
  },
  {
    id: '2',
    name: 'Rose Petal Magic',
    price: 9.49,
    category: 'Romantic',
    description:
      'Infused with real rose petals for a luxurious, fragrant experience that pampers your skin.',
  },
]

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const p = products.find(p => p.id === id)
    setProduct(p || null)
  }, [id])

  if (!product) {
    return (
      <section className="w-screen bg-white px-4 lg:px-8 py-12">
        <p className="text-gray-600 text-center">Product not found.</p>
        <div className="text-center mt-4">
          <Link to="/shop" className="text-green-600 hover:underline">
            Back to Shop
          </Link>
        </div>
      </section>
    )
  }

  const handleAdd = () => {
    console.log(`Adding ${quantity}× ${product.name} to cart`)
  }

  return (
    <section
      className="w-screen bg-white px-4 lg:px-8 py-12 flex items-center min-h-screen"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Image */}
        <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          Image
        </div>

        {/* Details */}
        <div className="w-full flex flex-col">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-gray-800 mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center mb-6 space-x-4">
            <label className="text-gray-700">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="w-20 px-2 py-1 bg-gray-200 text-black border border-gray-300 rounded focus:bg-gray-300 focus:outline-none"
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full lg:w-auto px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add to Cart
          </button>

          <div className="mt-6">
            <Link to="/shop" className="text-sm text-green-600 hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}