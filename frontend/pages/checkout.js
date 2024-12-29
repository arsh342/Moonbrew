import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      // Create the order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
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

  // ... rest of your component
} 