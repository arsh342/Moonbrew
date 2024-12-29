import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function OrderSuccessModal({ isOpen, onClose, orderId }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6"
          >
            {/* Success Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your order #{orderId.slice(-8)} has been placed successfully. You can track your order
                in the orders section.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/orders`}
                  className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
                >
                  View Order
                </Link>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 