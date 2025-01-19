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
      <Layout>
        <div className="bg-cream-50 min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="empty-cart-container">
              <Image
                src="/empty-cart.svg"
                alt="Empty Cart"
                width={200}
                height={200}
                className="empty-cart-image"
              />
              <h2 className="empty-cart-title">Your cart is empty</h2>
              <p className="empty-cart-text">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href="/menu" className="browse-menu-button">
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
                  <motion.div key={item.id} variants={item} className="card">
                    <div className="card-content">
                      <div className="card-image">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                          onError={(e) => (e.target.src = '/default-image.jpg')} // Fallback image
                        />
                      </div>
                      <div className="card-details">
                        <h3 className="card-title">{item.name}</h3>
                        <p className="card-price">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-4">
                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                item.quantity > 1 &&
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="quantity-button rounded-l-full"
                            >
                              -
                            </button>
                            <span className="px-4 py-1">{item.quantity || 1}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, (item.quantity || 1) + 1)
                              }
                              className="quantity-button rounded-r-full"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-button"
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
                <Bill totalAmount={totalAmount} />
              </div>
            </div>
          </div>

          {/* Cart Total */}
          <div className="mt-8 text-right">
            <h3 className="text-2xl font-semibold">Total: ${totalAmount}</h3>
            <Link
              href="/checkout"
              className="bill-button"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
