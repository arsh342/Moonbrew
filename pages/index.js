import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { motion } from "framer-motion"
import { useCart } from "../components/CartContext"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const featuredProducts = [
  {
    id: 1,
    name: "Cappuccino",
    description: "Espresso with foamy milk",
    price: 4.49,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100419.webp",
  },
  {
    id: 2,
    name: "Iced Americano",
    description: "Chilled espresso with water",
    price: 3.99,
    category: "Iced Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100441.webp",
  },
  {
    id: 3,
    name: "Butter Croissant",
    description: "Flaky, buttery pastry",
    price: 3.49,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/114550_1.webp",
  },
  {
    id: 4,
    name: "Chai Tea Latte",
    description: "Spiced black tea with milk",
    price: 4.49,
    category: "Specialty",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100367.webp",
  },
]

const heroImage = "https://sea-stones.com/cdn/shop/products/CZY-CozyCoffeeCoaster.jpg"

export default function Home() {
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white">
          <div className="container py-12 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-left md:w-1/2 mb-8 md:mb-0"
              >
                <h1 className="heading text-4xl md:text-6xl text-white mb-4">
                  Savor the Moment
                </h1>
                <p className="text-muted text-lg md:text-xl mb-6">
                  Indulge in our expertly crafted coffees, now available for delivery.
                </p>
                <Link href="/menu" passHref>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn"
                  >
                    Explore Our Menu
                  </motion.button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full md:w-1/2 h-[200px] md:h-[400px]"
              >
                <Image
                  src={heroImage || "/placeholder.svg"}
                  alt="Cozy Coffee"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-24">
          <div className="container">
            <h2 className="heading text-center mb-8">
              Featured Products
            </h2>
            <div className="relative">
              <motion.div
                className="flex transition-transform duration-300 ease-in-out overflow-hidden"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="w-full flex-shrink-0 px-2 md:px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="card">
                      <div className="relative h-48 md:h-56 mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">{product.name}</h3>
                      <p className="text-muted mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 dark:text-gray-200">${product.price.toFixed(2)}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className="btn"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
