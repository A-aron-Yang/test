// frontend/src/components/Footer.jsx
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 px-6 mt-auto">
      <div className="text-center text-gray-500">
        © {new Date().getFullYear()} SoapSmart. All rights reserved.
      </div>
    </footer>
  )
}