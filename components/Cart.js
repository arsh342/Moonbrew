import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-emerald-800">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.cartItemId} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-medium text-emerald-900">{item.name}</h3>
                  <p className="text-sm text-emerald-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
