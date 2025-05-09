import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

// Sample product data
const products = [
  { id: 1, name: 'Lavender Bliss',   price: 8.99, category: 'Relaxing'   },
  { id: 2, name: 'Rose Petal Magic', price: 9.49, category: 'Romantic'   },
  { id: 3, name: 'Citrus Sunrise',   price: 7.99, category: 'Energizing' },
  { id: 4, name: 'Minty Fresh',      price: 8.49, category: 'Refreshing' },
  { id: 5, name: 'Oatmeal Comfort',  price: 7.49, category: 'Sensitive'  },
  { id: 6, name: 'Charcoal Detox',   price: 9.99, category: 'Purifying'  },
]

const categories = ['All','Relaxing','Romantic','Energizing','Refreshing','Sensitive','Purifying']
const sortOptions = [
  { value: 'name_asc',  label: 'Name (A → Z)' },
  { value: 'name_desc', label: 'Name (Z → A)' },
  { value: 'price_asc', label: 'Price (Low → High)' },
  { value: 'price_desc',label: 'Price (High → Low)' },
]

export default function Shop() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy]     = useState('name_asc')

  const filtered = useMemo(() => {
    let list = products

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q))
    }
    if (category !== 'All') {
      list = list.filter(p => p.category === category)
    }
    return [...list].sort((a,b) => {
      switch (sortBy) {
        case 'name_asc':  return a.name.localeCompare(b.name)
        case 'name_desc': return b.name.localeCompare(a.name)
        case 'price_asc': return a.price - b.price
        case 'price_desc':return b.price - a.price
        default: return 0
      }
    })
  }, [search, category, sortBy])

  return (
    <section className="w-screen bg-white px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Shop Our Soaps
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-3 py-2 mb-4 sm:mb-0 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full sm:w-1/4 px-3 py-2 mb-4 sm:mb-0 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full sm:w-1/4 px-3 py-2 bg-gray-200 focus:bg-gray-300 text-black border border-gray-300 rounded"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(p => (
          <div key={p.id} className="border rounded-lg p-6 flex flex-col">
            <Link to={`/product/${p.id}`}>
              <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center text-gray-400">
                Image
              </div>
            </Link>
            <Link to={`/product/${p.id}`} className="hover:underline">
              <h2 className="font-semibold text-gray-900 mb-2">{p.name}</h2>
            </Link>
            <p className="text-gray-700 mb-4">${p.price.toFixed(2)}</p>
            <button className="mt-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
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
