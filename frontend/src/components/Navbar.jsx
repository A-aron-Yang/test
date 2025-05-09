import React from 'react'

export default function NavBar() {
  return (
    <nav className="bg-white shadow w-full">
      <div className="px-6 flex items-center h-16">
        <a href="/home" className="text-2xl font-bold text-green-600 flex-1">
          🧼 SoapSmart
        </a>
        <div className="flex items-center space-x-8">
          <a href="/home" className="text-gray-700 hover:text-green-600">Home</a>
          <a href="/shop" className="text-gray-700 hover:text-green-600">Shop</a>
          <a href="/cart" className="relative text-gray-700 hover:text-green-600">
            <i className="fas fa-shopping-cart"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </a>
          <a href="/login" className="text-gray-700 hover:text-green-600">
            <i className="fas fa-user"></i> Login
          </a>
        </div>
      </div>
    </nav>
  )
}
