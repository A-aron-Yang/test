import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Reviews() {
  const { productId } = useParams()
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  })
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Fetch product details
    fetch(`http://localhost:5000/api/products`)
      .then(res => res.json())
      .then(products => {
        const product = products.find(p => p.id === parseInt(productId))
        setProduct(product)
      })
      .catch(error => console.error('Error fetching product:', error))

    // Fetch reviews for this product
    fetch(`http://localhost:5000/api/reviews/${productId}`)
      .then(res => res.json())
      .then(setReviews)
      .catch(error => console.error('Error fetching reviews:', error))
  }, [productId])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newReview,
        productId: parseInt(productId)
      })
    })
      .then(res => res.json())
      .then(review => {
        setReviews([...reviews, review])
        setNewReview({
          rating: 5,
          comment: '',
          userName: ''
        })
      })
      .catch(error => console.error('Error posting review:', error))
  }

  if (!product) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-2">{product.name} - Reviews</h1>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Write a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Your Name</label>
            <input
              type="text"
              value={newReview.userName}
              onChange={e => setNewReview({ ...newReview, userName: e.target.value })}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Rating</label>
            <select
              value={newReview.rating}
              onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Review</label>
            <textarea
              value={newReview.comment}
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
              required
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write your review here"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-black">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-black">{review.userName}</p>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">★</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
