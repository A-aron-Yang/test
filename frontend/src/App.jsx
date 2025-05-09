import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import SubscribeButton  from './components/SubscribeButton'
import MainFooter       from './components/MainFooter'
import Login            from './pages/Login'
import Verify           from './pages/Verify'
import CreateAccount from './pages/CreateAccount'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Routes>
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
      </Routes>
    </div>
  )
}
