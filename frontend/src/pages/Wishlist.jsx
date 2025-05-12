import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([])
  const [products, setProducts] = useState([])
  // For demo purposes, using a hardcoded userId. In a real app, this would come from auth
  const userId = '1'

  useEffect(() => {
    // Fetch all products
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(error => console.error('Error fetching products:', error))

    // Fetch user's wishlist
    fetch(`http://localhost:5000/api/wishlist/${userId}`)
      .then(res => res.json())
      .then(setWishlistItems)
      .catch(error => console.error('Error fetching wishlist:', error))
  }, [])

  const removeFromWishlist = (productId) => {
    fetch(`http://localhost:5000/api/wishlist/${userId}/remove/${productId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(setWishlistItems)
      .catch(error => console.error('Error removing from wishlist:', error))
  }

  const wishlistProducts = products.filter(product => 
    wishlistItems.includes(product.id)
  )

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">My Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link 
            to="/shop" 
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map(product => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/product/${product.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
