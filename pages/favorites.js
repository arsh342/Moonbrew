import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout' // Replace with your actual layout component

export default function Favorites() {
  const [favorites, setFavorites] = useState([]) // Initialize with an empty array
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Simulate API call to fetch favorites
  const fetchFavorites = async () => {
    try {
      setLoading(true)
      setError(null)
      // Simulate an API call delay
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]), 2000)
      )
      setFavorites(response)
    } catch (err) {
      setError('Failed to fetch favorite items.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch favorites on component mount
  useEffect(() => {
    fetchFavorites()
  }, [])

  // Variants for animation
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8">Your Favorites</h1>

        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
            Loading your favorite items...
          </div>
        ) : (
          <>
            {/* Empty State */}
            {favorites?.length === 0 ? (
              <div className="text-center text-gray-600 text-lg">
                You have no favorite items yet.
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={gridVariants}
              >
                {favorites.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
                    variants={itemVariants}
                  >
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <button
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      onClick={() => {
                        setFavorites(favorites.filter((fav) => fav.id !== item.id))
                      }}
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
