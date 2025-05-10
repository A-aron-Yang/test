import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    navigate('/verify', { state: { email } })
    console.log('Logging in with', { email, password })
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
        <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="
              mt-1 block w-full px-3 py-2 
              bg-gray-200 focus:bg-gray-300 
              text-black 
              border border-gray-300 rounded 
              focus:outline-none
            "
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="
              mt-1 block w-full px-3 py-2 
              bg-gray-200 focus:bg-gray-300 
              text-black 
              border border-gray-300 rounded 
              focus:outline-none
            "
          />
        </label>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Log In
        </button>

        <div className="mt-4 text-right">
          <Link
            to="/create-account"
            className="text-sm text-green-600 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </form>
    </section>
  )
}
