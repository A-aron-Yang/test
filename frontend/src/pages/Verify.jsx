// src/pages/Verify.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Verify() {
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    // stub: accept any code → go home
    navigate('/home', { replace: true })
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
          Enter Verification Code
        </h2>

        <label className="block mb-6">
          <span className="text-gray-700">Code</span>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
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
          Verify
        </button>

        <div className="mt-4 text-right">
          <Link
            to="/login"
            className="text-sm text-green-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </section>
  )
}
