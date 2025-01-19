import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../components/CartContext';
import { useState } from 'react';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(0.1 * total); // 10% discount
      toast.success('Promo code applied successfully!');
    } else {
      toast.error('Invalid promo code.');
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total - discount,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      clearCart();
      toast.success('Order placed successfully!');
      router.push('/orders/');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Discount:</span>
              <span className="text-green-600">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${(total - discount).toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={applyPromoCode}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Back to Shopping
            </button>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`${
                loading ? 'bg-green-500' : 'bg-green-700 hover:bg-green-800'
              } text-white py-2 px-4 rounded-lg transition duration-200`}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
