import React from 'react'
import { Link } from 'react-router-dom'
import { useCart, useCartDispatch } from '../context/CartContext'

export default function Cart() {
  const cartItems = useCart()
  const dispatch  = useCartDispatch()

  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  const handleRemove = id =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })

  return (
    <section className="w-screen bg-white px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty{' '}
          <Link
            to="/shop"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-0"
          >
            Continue Shopping
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 p-4 rounded shadow"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                  <p className="text-gray-700">${item.price.toFixed(2)} each</p>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-8 flex items-center space-x-2">
                  <label className="text-gray-700">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    readOnly
                    className="w-16 px-2 py-1 bg-gray-200 text-black border border-gray-300 rounded focus:bg-gray-300 focus:outline-none"
                  />
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col items-end space-y-4">
                  <p className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-end justify-between bg-gray-100 p-6 rounded">
            <div className="text-lg font-semibold text-gray-900">
              Subtotal: ${subtotal}
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Link
                to="/shop"
                onClick={() => window.scrollTo(0, 0)}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-0"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-0"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
