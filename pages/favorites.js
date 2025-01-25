import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useFavorites } from '../components/FavoritesContext';
import { useCart } from '../components/CartContext';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout title="Favorites | Moonbrew Coffee">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8">Your Favorites</h1>

        {favorites.length === 0 ? (
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
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-2 right-2 bg-white/75 rounded-full p-2"
                  >
                    <Heart fill="red" color="red" className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex justify-between mt-4">
                    <button 
                      onClick={() => {
                        addToCart(item);
                        toast.success('Added to cart!');
                      }}
                      className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
