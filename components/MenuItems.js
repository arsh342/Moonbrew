import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useCart } from "../components/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { Heart } from "lucide-react"
import LoginModal from "./LoginModal"

export default function MenuItem({ item }) {
  const { addToCart, toggleFavorite, isFavorite } = useCart()
  const { user } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleAddToCart = () => {
    if (user) {
      addToCart(item)
    } else {
      setShowLoginModal(true)
    }
  }

  const handleToggleFavorite = () => {
    if (user) {
      toggleFavorite(item)
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-48">
        <Image src={item.image || "/placeholder.jpg"} alt={item.name} layout="fill" objectFit="cover" />
        <button onClick={handleToggleFavorite} className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <Heart size={20} className={isFavorite(item.id) ? "text-red-500 fill-current" : "text-gray-400"} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-emerald-900">{item.name}</h3>
        <p className="text-emerald-600 text-sm mb-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-emerald-700">${item.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </motion.div>
  )
}

