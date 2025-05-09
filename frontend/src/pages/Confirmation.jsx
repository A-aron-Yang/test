import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Confirmation() {
  const { state } = useLocation()
  const order = state?.order || []
  const email = state?.email || 'your email'

  const total = order
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  return (
    <section
      className="w-screen bg-white flex items-start justify-center pt-24 pb-12"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-full max-w-lg bg-gray-50 p-8 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Thank You for Your Order!
        </h2>
        <p className="text-gray-700 text-center mb-8">
          A purchase receipt has been emailed to <span className="font-medium">{email}</span>.
        </p>

        <div className="space-y-4 mb-6">
          {order.map(item => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-700 text-sm">
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold text-gray-900 mb-6">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <div className="space-y-4">
          <Link
            to="/home"
            className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Return to Home
          </Link>
          <Link
            to="/shop"
            className="block w-full text-center text-green-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}
