import React from 'react'
import { Link } from 'react-router-dom'
import { useCartDispatch } from '../context/CartContext'

export default function FeaturedProducts() {
  const dispatch = useCartDispatch()

  const featured = [1,2,3,4,5,6,7,8].map(n => ({
    id: n.toString(),
    name: `Soap ${n}`,
    price: 7 + n * 0.5,
  }))

  const addToCart = item =>
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity: 1 },
    })

  return (
    <section id="featured" className="w-full bg-white py-12">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Featured Soaps
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 lg:px-12">
        {featured.map(item => (
          <div key={item.id} className="border rounded-lg p-6 flex flex-col">
            <Link to={`/product/${item.id}`}>
              <div className="h-48 bg-gray-100 mb-4 w-full flex items-center justify-center text-gray-400">
                Image
              </div>
            </Link>
            <Link to={`/product/${item.id}`} className="hover:underline">
              <h3 className="font-semibold mb-2 text-gray-900">{item.name}</h3>
            </Link>
            <p className="text-gray-700 mb-4">${item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
