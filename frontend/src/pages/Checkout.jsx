import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Checkout() {
  // TODO: replace with real cart state
  const sampleCart = [
    { id: 1, name: 'Lavender Bliss', price: 8.99, quantity: 3 }
  ]
  const subtotal = sampleCart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  const [firstName, setFirstName]   = useState('')
  const [lastName, setLastName]     = useState('')
  const [address, setAddress]       = useState('')
  const [city, setCity]             = useState('')
  const [state, setState]           = useState('')
  const [zip, setZip]               = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [exp, setExp]               = useState('')
  const [cvv, setCvv]               = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: submit order
    navigate('/confirmation', { state: { order: sampleCart, email: `${firstName} ${lastName}` } })
  }

  return (
    <section
      className="w-screen bg-white flex flex-col lg:flex-row px-4 lg:px-8 py-12"
      style={{ minHeight: '100vh' }}
    >
      {/* Order Summary - desktop only */}
      <aside className="hidden lg:block w-1/3 bg-gray-50 p-6 rounded shadow ml-8">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="space-y-4">
          {sampleCart.map(item => (
            <li key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-700 text-sm">
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-gray-900">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
      </aside>

      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-2/3 bg-gray-50 p-8 rounded shadow"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>

        {/* Shipping Info */}
        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-gray-900">Shipping Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
            />
          </div>
          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={e => setState(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={zip}
              onChange={e => setZip(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Payment Info */}
        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-gray-900">Payment Information</h3>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              value={exp}
              onChange={e => setExp(e.target.value)}
              required
              className="px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={e => setCvv(e.target.value)}
              required
              className="px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Place Order */}
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Place Order
          </button>
          <div className="text-right">
            <Link to="/cart" className="text-sm text-green-600 hover:underline">
              Back to Cart
            </Link>
          </div>
        </div>
      </form>
    </section>
  )
}
