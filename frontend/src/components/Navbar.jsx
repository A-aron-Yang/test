import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const cart = useCart()
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <nav className="w-screen bg-white shadow">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <Link to="/home" className="text-2xl font-bold text-green-600">
          🧼 SoapSmart
        </Link>
        <div className="flex space-x-6">
          <Link to="/home"      className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/shop"  className="text-gray-700 hover:text-green-600">
            Shop
          </Link>
          <Link to="/cart"  className="relative text-gray-700 hover:text-green-600">
            <i className="fas fa-shopping-cart"></i>
            {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalCount}
            </span>
            )}
          </Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-green-600">
            Wishlist
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-green-600">
            <i className="fas fa-user"></i> Login
          </Link>
        </div>
      </div>
    </nav>
)
}
