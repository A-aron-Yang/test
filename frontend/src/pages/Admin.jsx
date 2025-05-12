import React, { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/api'

export default function Admin() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    id: null,
    name: '',
    category: '',
    fragrance: '',
    skinType: '',
    ingredients: '',
    price: '',
    image: '',
    description: ''
  })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(setProducts)
      .catch(error => console.error('Error fetching products:', error))
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `${API_URL}/products/${form.id}` : `${API_URL}/products`
    const body = {
      ...form,
      ingredients: form.ingredients.split(',').map(i => i.trim()),
      price: parseFloat(form.price)
    }
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(product => {
        if (editing) {
          setProducts(products.map(p => (p.id === product.id ? product : p)))
        } else {
          setProducts([...products, product])
        }
        setForm({
          id: null,
          name: '',
          category: '',
          fragrance: '',
          skinType: '',
          ingredients: '',
          price: '',
          image: '',
          description: ''
        })
        setEditing(false)
      })
      .catch(error => console.error('Error saving product:', error))
  }

  const handleEdit = product => {
    setForm({
      ...product,
      ingredients: product.ingredients.join(', ')
    })
    setEditing(true)
  }

  const handleDelete = id => {
    fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setProducts(products.filter(p => p.id !== id))
      })
      .catch(error => console.error('Error deleting product:', error))
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Product Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="fragrance"
          value={form.fragrance}
          onChange={handleChange}
          placeholder="Fragrance"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="skinType"
          value={form.skinType}
          onChange={handleChange}
          placeholder="Skin Type"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {editing ? 'Update Product' : 'Add Product'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setForm({
                id: null,
                name: '',
                category: '',
                fragrance: '',
                skinType: '',
                ingredients: '',
                price: '',
                image: '',
                description: ''
              })
              setEditing(false)
            }}
            className="ml-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      <h2 className="text-xl font-semibold mb-2 text-black">Existing Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id} className="mb-2 border p-2 rounded flex justify-between items-center text-black">
            <div>
              <strong className="text-black">{p.name}</strong> - <span className="text-black">${p.price.toFixed(2)}</span>
            </div>
            <div>
              <button
                onClick={() => handleEdit(p)}
                className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
