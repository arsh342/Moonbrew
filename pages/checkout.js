import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../components/CartContext';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
          quantity: item.quantity
        })),
        total: total,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Clear the cart and redirect to orders page
      clearCart();
      toast.success('Order placed successfully!');
      router.push('/orders/');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };
  return (
    <div>
      {/* Add your checkout form/UI components here */}
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center border-b py-2">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover mr-4" />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
        <div className="text-xl font-bold">Total: ${total}</div>
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
    </div>
  );
}