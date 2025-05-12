import React, { useEffect, useState } from 'react'

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
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/products/${form.id}` : '/api/products'
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
  }
}