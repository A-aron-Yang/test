import NavBar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/MainFooter'
import Subscribe from './components/SubscribeButton'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Hero />
      <FeaturedProducts />
      <Subscribe />
      <Footer />
    </div>
  )
}