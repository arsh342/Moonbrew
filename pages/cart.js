import { useCart } from '../components/CartContext'
import Layout from '../components/Layout'
import Bill from '../components/Bill'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (cart.length === 0) {
    return (
      <Layout title="Cart | Moonbrew Coffee">
        <div className="bg-cream-50 min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="empty-cart-container text-center">
              <Image
                src="/empty-cart.svg"
                alt="Empty Cart"
                width={200}
                height={200}
                className="empty-cart-image mx-auto"
              />
              <h2 className="empty-cart-title text-2xl font-semibold mt-4">Your cart is empty</h2>
              <p className="empty-cart-text text-sm mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href="/menu" className="browse-menu-button text-white bg-primary rounded-lg px-6 py-3 hover:bg-primary-dark">
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  const totalAmount = cart
    .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
    .toFixed(2)

  return (
    <Layout title="Cart | Moonbrew Coffee">
      <div className="bg-cream-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-primary">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {cart.map((item) => (
                  <motion.div key={item.id} variants={item} className="card p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="card-content flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                      <div className="card-image w-24 h-24 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                          onError={(e) => (e.target.src = '/default-image.jpg')}
                        />
                      </div>
                      <div className="card-details flex flex-col space-y-2">
                        <h3 className="card-title text-lg font-medium text-primary">{item.name}</h3>
                        <p className="card-price text-base font-semibold">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <div className="quantity-controls flex items-center space-x-2">
                            <button
                              onClick={() =>
                                item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                              }
                              className="quantity-button w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-base">{item.quantity || 1}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, (item.quantity || 1) + 1)
                              }
                              className="quantity-button w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-button text-red-500 font-semibold hover:text-red-700 transition duration-200"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="font-bold text-lg text-primary">
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
                <Bill totalAmount={totalAmount} />
              </div>
            </div>
          </div>

          {/* Cart Total */}
          <div className="mt-8 text-right">
            <Link
              href="/checkout"
              className="bill-button mt-4 bg-primary text-white rounded-lg px-8 py-3 hover:bg-primary-dark"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}