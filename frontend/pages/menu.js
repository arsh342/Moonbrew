import Head from 'next/head';
import Layout from '../components/Layout';
import { useCart } from '../components/CartContext';
import Image from 'next/image';
import { menuItems } from '../data/products';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function Menu() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Hot Coffee', 'Iced Coffee', 'Bakery', 'Breakfast', 'Seasonal', 'Specialty'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout title="Menu | Moonbrew Coffee">
      <Head>
        <title>Our Menu | Moonbrew Coffee</title>
      </Head>
      <div className="bg-cream-50 min-h-screen-dynamic py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Our Menu</h1>
          
          {/* Category Filter */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={item}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-sm opacity-90">{item.size}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.ingredients?.map((ingredient, index) => (
                      <span 
                        key={index}
                        className="bg-cream-50 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => {
                        addToCart(item);
                        toast.success('Added to cart!');
                      }}
                      className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 