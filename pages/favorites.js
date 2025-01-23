import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { favorites, removeFromFavorites } from '../data/products';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const [favoriteItems, setFavoriteItems] = useState(favorites);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleRemoveFavorite = (productId) => {
    removeFromFavorites(productId);
    setFavoriteItems(favorites);
  };

  return (
    <Layout title="Favorites | Moonbrew Coffee">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8">Your Favorites</h1>

        {favoriteItems.length === 0 ? (
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
            {favoriteItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                variants={itemVariants}
              >
                <div className="relative h-48">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                  />
                  <button 
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="absolute top-2 right-2 bg-white/75 rounded-full p-2"
                  >
                    <Heart fill="red" color="red" className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}