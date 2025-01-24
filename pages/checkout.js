import { db } from '../config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../components/CartContext'
import { useState } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'

export default function Checkout() {
  const { user } = useAuth()
  const { cart, total, clearCart } = useCart()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit',
  })

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(0.1 * total)
      toast.success('Promo code applied successfully!')
    } else {
      toast.error('Invalid promo code.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = 'Valid email is required'
    if (!formData.address.trim()) errors.address = 'Address is required'
    return Object.keys(errors).length === 0 ? null : errors
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setLoading(true)

    const validationErrors = validateForm()
    if (validationErrors) {
      Object.values(validationErrors).forEach((error) => toast.error(error))
      setLoading(false)
      return
    }

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        ...formData,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total - discount,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      clearCart()
      toast.success('Order placed successfully!')
      router.push('/orders')
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Checkout | Moonbrew Coffee">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-black">Checkout Details</h2>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block mb-2 text-black">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-black">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-black">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-black">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-black"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-black">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-black">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg text-black"
                  >
                    <option value="credit">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="apple">Apple Pay</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-black">Order Summary</h2>
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-black">{item.name}</h3>
                      <p className="text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code"
                    className="flex-grow px-4 py-2 border rounded-lg text-black"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-black">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-black">
                  <span>Total</span>
                  <span>${(total - discount).toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className={`w-full mt-6 py-3 rounded-lg text-white transition-colors ${loading || cart.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 hover:bg-gray-900'
                  }`}
              >
                {loading ? 'Processing...' : 'Complete Order'}
              </button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
