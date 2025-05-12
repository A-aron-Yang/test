import 'dotenv/config'  
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// In-memory stores
let reviews = []
let wishlists = {}
let products = [
  {
    id: 1,
    name: 'Lavender Bliss',
    price: 8.99,
    description: 'A soothing blend of pure lavender essential oil to calm your senses and soften skin.',
    category: 'Relaxing',
    fragrance: 'Lavender',
    ingredients: ['Natural Oils', 'Herbal Extracts', 'Lavender Essential Oil'],
    skinType: 'Sensitive',
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'
  },
  {
    id: 2,
    name: 'Rose Petal Magic',
    price: 9.49,
    description: 'Infused with real rose petals for a luxurious, fragrant experience that pampers your skin.',
    category: 'Romantic',
    fragrance: 'Rose',
    ingredients: ['Organic Rose Petals', 'Essential Oils', 'Shea Butter'],
    skinType: 'Normal',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg'
  },
  {
    id: 3,
    name: 'Citrus Sunrise',
    price: 7.99,
    description: 'A burst of citrus aroma, perfect for an energizing morning routine.',
    category: 'Energizing',
    fragrance: 'Citrus',
    ingredients: ['Citrus Extracts', 'Natural Oils', 'Orange Peel'],
    skinType: 'Oily',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg'
  },
  {
    id: 4,
    name: 'Minty Fresh',
    price: 8.49,
    description: 'Cool and invigorating peppermint soap for a refreshing clean feeling.',
    category: 'Refreshing',
    fragrance: 'Mint',
    ingredients: ['Peppermint Oil', 'Coconut Oil', 'Aloe Vera'],
    skinType: 'Normal',
    image: 'https://images.pexels.com/photos/6621323/pexels-photo-6621323.jpeg'
  },
  {
    id: 5,
    name: 'Oatmeal Comfort',
    price: 7.49,
    description: 'Gentle oatmeal soap that soothes and nourishes sensitive skin.',
    category: 'Sensitive',
    fragrance: 'Unscented',
    ingredients: ['Colloidal Oatmeal', 'Honey', 'Goat Milk'],
    skinType: 'Sensitive',
    image: 'https://images.pexels.com/photos/6621264/pexels-photo-6621264.jpeg'
  },
  {
    id: 6,
    name: 'Charcoal Detox',
    price: 9.99,
    description: 'Deep cleansing activated charcoal soap for purified, refreshed skin.',
    category: 'Purifying',
    fragrance: 'Tea Tree',
    ingredients: ['Activated Charcoal', 'Tea Tree Oil', 'Eucalyptus'],
    skinType: 'Oily',
    image: 'https://images.pexels.com/photos/6621552/pexels-photo-6621552.jpeg'
  }
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

// Reviews endpoints
app.get('/api/reviews/:productId', (req, res) => {
  const productId = parseInt(req.params.productId)
  const productReviews = reviews.filter(review => review.productId === productId)
  res.json(productReviews)
})

app.post('/api/reviews', (req, res) => {
  const newReview = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  }
  reviews.push(newReview)
  res.status(201).json(newReview)
})

// Wishlist endpoints
app.get('/api/wishlist/:userId', (req, res) => {
  const userId = req.params.userId
  const userWishlist = wishlists[userId] || []
  res.json(userWishlist)
})

app.post('/api/wishlist/:userId/add', (req, res) => {
  const userId = req.params.userId
  const { productId } = req.body

  if (!wishlists[userId]) {
    wishlists[userId] = []
  }

  if (!wishlists[userId].includes(productId)) {
    wishlists[userId].push(productId)
  }

  res.json(wishlists[userId])
})

app.delete('/api/wishlist/:userId/remove/:productId', (req, res) => {
  const userId = req.params.userId
  const productId = parseInt(req.params.productId)

  if (wishlists[userId]) {
    wishlists[userId] = wishlists[userId].filter(id => id !== productId)
  }

  res.json(wishlists[userId])
})

const PORT = process.env.PORT ?? 5000
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})
