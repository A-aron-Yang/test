import 'dotenv/config'  
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// In memory product store
let products = [
  {
    id: 1,
    name: 'Charcoal Detox',
    category: 'Purifying',
    fragrance: 'Unscented',
    skinType: 'Oily',
    ingredients: ['Activated Charcoal', 'Coconut Oil', 'Shea Butter'],
    price: 7.99,
    image: '/images/charcoal-detox.jpg',
    description: 'Deep cleansing soap with activated charcoal.'
  }
  // Add initial products or load from file/db as needed
]

// Health check endpoint
app.get('/health', (req, res) => {
  res.send({ status: 'OK' })
})

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products)
})

// Add a new product
app.post('/api/products', (req, res) => {
  const newProduct = { ...req.body, id: Date.now() }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

// Update a product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = products.findIndex(p => p.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' })
  }
  products[index] = { ...products[index], ...req.body }
  res.json(products[index])
})

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  products = products.filter(p => p.id !== id)
  res.status(204).send()
})

const PORT = process.env.PORT ?? 5000
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})
