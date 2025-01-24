import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function LoginModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-emerald-800 text-center">
              {isLogin ? "Login to Your Account" : "Create an Account"}
            </h2>
            <p className="text-emerald-600 mb-6 text-center">
              {isLogin ? "Please login to add items to your cart" : "Sign up to start shopping with us"}
            </p>
            <div className="space-y-4">
              <Link
                href="/auth/signin"
                className="block w-full py-2 px-4 bg-emerald-600 text-white rounded-full text-center hover:bg-emerald-700 transition-colors"
              >
                {isLogin ? "Login" : "Sign Up"}
              </Link>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="block w-full py-2 px-4 bg-gray-200 text-emerald-800 rounded-full text-center hover:bg-gray-300 transition-colors"
              >
                {isLogin ? "Create an Account" : "Already have an account? Login"}
              </button>
            </div>
            <button onClick={onClose} className="mt-6 text-emerald-600 hover:text-emerald-800 transition-colors">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

