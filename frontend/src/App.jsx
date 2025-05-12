import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import SubscribeButton from './components/SubscribeButton'
import MainFooter from './components/MainFooter'
import Login from './pages/Login'
import Verify from './pages/Verify'
import CreateAccount from './pages/CreateAccount'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Admin from './pages/Admin'
import Reviews from './pages/Reviews'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/shop" replace />} />
        <Route
          path="/home"
          element={
            <>
              <Hero />
              <FeaturedProducts />
              <SubscribeButton />
              <MainFooter />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reviews/:productId" element={<Reviews />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  )
}
