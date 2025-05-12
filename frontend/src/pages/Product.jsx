import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCartDispatch } from '../context/CartContext'
import products from '../data/products'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useCartDispatch()

  useEffect(() => {
    setProduct(products.find(p => p.id === id) || null)
  }, [id])

  if (!product) {
    return (
      <section className="w-screen bg-white px-4 lg:px-8 py-12">
        <p className="text-gray-600 text-center">Product not found.</p>
        <div className="text-center mt-4">
          <Link to="/shop" className="text-black hover:underline">
            Back to Shop
          </Link>
        </div>
      </section>
    )
  }

  const handleAdd = () =>
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity },
    })

  return (
    <section className="w-screen bg-white px-4 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-900 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="prose prose-sm text-gray-600 mb-8">
              <p className="text-lg mb-6">{product.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Fragrance</h3>
                  <p className="mt-1">{product.fragrance}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>
                  <p className="mt-1">{product.ingredients.join(', ')}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">Skin Type</h3>
                  <p className="mt-1">{product.skinType}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">Category</h3>
                  <p className="mt-1">{product.category}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <label className="text-gray-700">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-20 px-2 py-1 bg-gray-200 text-black border border-gray-300 rounded focus:bg-gray-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleAdd}
                className="w-full lg:w-auto px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  fetch(`http://localhost:5000/api/wishlist/1/add`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId: parseInt(id) })
                  })
                    .then(res => res.json())
                    .catch(error => console.error('Error adding to wishlist:', error))
                }}
                className="w-full lg:w-auto px-8 py-3 bg-white text-black border border-black rounded hover:bg-gray-100 transition-colors"
              >
                Add to Wishlist
              </button>

              <Link 
                to={`/reviews/${id}`}
                className="w-full lg:w-auto px-8 py-3 text-center bg-gray-100 text-black rounded hover:bg-gray-200 transition-colors"
              >
                View Reviews
              </Link>

              <Link 
                to="/shop" 
                className="text-sm text-black hover:underline inline-block"
              >
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
