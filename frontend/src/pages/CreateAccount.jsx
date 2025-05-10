import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CreateAccount() {
  const [firstName, setFirstName]   = useState('')
  const [lastName, setLastName]     = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirmPw, setConfirmPw]   = useState('')
  const [phone, setPhone]           = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: call create‑account API
    navigate('/login', { replace: true })
  }

  return (
    <section
      className="w-screen bg-white flex items-start justify-center pt-24 pb-12"
      style={{ minHeight: '100vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-50 p-8 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Last Name</span>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Confirm Password</span>
          <input
            type="password"
            value={confirmPw}
            onChange={e => setConfirmPw(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded focus:outline-none"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Phone (optional)</span>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Account
        </button>

        <div className="mt-4 text-right">
          <Link to="/login" className="text-sm text-green-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </section>
  )
}
