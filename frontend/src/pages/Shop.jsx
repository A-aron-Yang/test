import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCartDispatch } from '../context/CartContext'
import products from '../data/products'

const categories = ['All', 'Relaxing', 'Romantic', 'Energizing', 'Refreshing', 'Sensitive', 'Purifying']
const fragranceOptions = ['All', 'Lavender', 'Rose', 'Citrus', 'Mint', 'Unscented', 'Tea Tree']
const skinTypeOptions = ['All', 'Sensitive', 'Normal', 'Oily']
const ingredientOptions = ['All', 'Natural Oils', 'Herbal Extracts', 'Essential Oils', 'Organic Rose Petals', 'Citrus Extracts', 'Peppermint Oil', 'Colloidal Oatmeal', 'Activated Charcoal']
const sortOptions = [
  { value: 'name_asc', label: 'Name (A → Z)' },
  { value: 'name_desc', label: 'Name (Z → A)' },
  { value: 'price_asc', label: 'Price (Low → High)' },
  { value: 'price_desc', label: 'Price (High → Low)' },
]

export default function Shop() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [fragrance, setFragrance] = useState('All')
  const [skinType, setSkinType] = useState('All')
  const [ingredient, setIngredient] = useState('All')
  const [sortBy, setSortBy] = useState('name_asc')
  const dispatch = useCartDispatch()

  const filtered = useMemo(() => {
    let list = products
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q))
    }
    if (category !== 'All') {
      list = list.filter(p => p.category === category)
    }
    if (fragrance !== 'All') {
      list = list.filter(p => p.fragrance === fragrance)
    }
    if (skinType !== 'All') {
      list = list.filter(p => p.skinType === skinType)
    }
    if (ingredient !== 'All') {
      list = list.filter(p => p.ingredients.includes(ingredient))
    }
    return [...list].sort((a,b) => {
      switch (sortBy) {
        case 'name_asc': return a.name.localeCompare(b.name)
        case 'name_desc': return b.name.localeCompare(a.name)
        case 'price_asc': return a.price - b.price
        case 'price_desc': return b.price - a.price
        default: return 0
      }
    })
  }, [search, category, fragrance, skinType, ingredient, sortBy])

  const addToCart = item =>
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } })

  return (
    <section className="w-screen bg-white px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Shop Our Soaps
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        >
          <option value="" disabled>Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          value={fragrance}
          onChange={e => setFragrance(e.target.value)}
          className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        >
          <option value="" disabled>Fragrance</option>
          {fragranceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <select
          value={skinType}
          onChange={e => setSkinType(e.target.value)}
          className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        >
          <option value="" disabled>Skin Type</option>
          {skinTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <select
          value={ingredient}
          onChange={e => setIngredient(e.target.value)}
          className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        >
          <option value="" disabled>Ingredients</option>
          {ingredientOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        >
          <option value="" disabled>Sort By</option>
          {sortOptions.map(opt =>
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(p => (
          <div key={p.id} className="border rounded-lg p-6 flex flex-col">
            <Link to={`/product/${p.id}`} className="block">
              <div className="h-48 bg-gray-100 mb-4 rounded overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-semibold text-gray-900 mb-2 hover:underline">{p.name}</h2>
            </Link>
            <p className="text-gray-600 text-sm mb-2">Fragrance: {p.fragrance}</p>
            <p className="text-gray-600 text-sm mb-2">Skin Type: {p.skinType}</p>
            <p className="text-gray-700 mb-4">${p.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-600 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </section>
  )
}
