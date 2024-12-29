import { useCart } from '../components/CartContext';
import Layout from '../components/Layout';
import Bill from '../components/Bill';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="bg-cream-50 min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="mb-8">
                <Image
                  src="/empty-cart.svg"
                  alt="Empty Cart"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                href="/menu"
                className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 inline-block"
              >
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-cream-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">Your Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                className="space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={item}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6 flex items-center gap-6">
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="px-3 py-1 hover:bg-gray-100 rounded-l-full"
                            >
                              -
                            </button>
                            <span className="px-4 py-1">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="px-3 py-1 hover:bg-gray-100 rounded-r-full"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="font-bold text-lg">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bill Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Bill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 