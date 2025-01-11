import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../components/CartContext';
import { billService } from '../services/billService';
import PaymentForm from './PaymentForm';
import OrderSuccessModal from './OrderSuccessModal';

export default function Bill() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handlePaymentComplete = async (paymentDetails) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Ensure we have all required data
      if (!user?.uid) {
        throw new Error('User authentication required');
      }

      if (!cart.length) {
        throw new Error('Cart is empty');
      }

      // Format cart items with required fields and proper type conversion
      const formattedItems = cart.map(item => ({
        id: item.id || `item-${Date.now()}`, // Fallback ID if none exists
        name: item.name,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity || 1),
        image: item.image || null,
        category: item.category || 'uncategorized'
      }));

      // Log formatted items for debugging
      console.log('Formatted Items:', formattedItems);

      // Create bill data object with all required fields
      const billData = {
        userId: user.uid,
        items: formattedItems,
        total: Number(total.toFixed(2)),
        status: 'pending',
        createdAt: new Date(),
        paymentDetails: {
          method: paymentDetails.method,
          status: paymentDetails.status,
          transactionId: paymentDetails.transactionId
        }
      };

      // Validate the data before sending
      const validationErrors = [];
      if (!billData.userId) validationErrors.push('Invalid user ID');
      if (!billData.items.length) validationErrors.push('No items in cart');
      if (isNaN(billData.total)) validationErrors.push('Invalid total amount');

      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const result = await billService.createBill(billData);
      
      if (!result?.id) {
        throw new Error('Failed to create bill: No bill ID returned');
      }

      clearCart();
      setOrderId(result.id);
      setOrderSuccess(true);
    } catch (err) {
      console.error('Bill creation error:', err);
      setError(err.message || 'Failed to create bill. Please try again.');
    } finally {
      setIsProcessing(false);
      setShowPayment(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Bill</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id || item.name} className="flex justify-between items-center">
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-500 ml-2">x{item.quantity || 1}</span>
            </div>
            <span>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {showPayment ? (
          <PaymentForm 
            total={total} 
            onPaymentComplete={handlePaymentComplete} 
          />
        ) : (
          <button
            onClick={() => setShowPayment(true)}
            disabled={isProcessing || cart.length === 0}
            className={`w-full py-2 px-4 rounded-full font-semibold ${
              isProcessing || cart.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-700 text-white hover:bg-green-800'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        )}
      </div>
      <OrderSuccessModal 
        isOpen={orderSuccess}
        onClose={() => setOrderSuccess(false)}
        orderId={orderId}
      />
    </div>
  );
}