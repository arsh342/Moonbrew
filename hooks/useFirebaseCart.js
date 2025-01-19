import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

export function useFirebaseCart(userId) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from Firestore
  const loadCart = async () => {
    if (!userId) return [];  // If no userId, return empty cart

    setIsLoading(true);
    setError(null);  // Reset previous error
    
    try {
      const db = getFirestore();
      const cartRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartRef);
      
      setIsLoading(false);
      
      if (cartDoc.exists()) {
        setCart(cartDoc.data().items || []);  // Update state with cart items
      } else {
        setCart([]);  // No cart found, set to empty array
      }
    } catch (err) {
      setError(err.message);  // Set error state if something goes wrong
      setIsLoading(false);
      console.error('Error loading cart:', err);
    }
  };

  // Sync cart to Firestore
  const syncCart = async (items) => {
    if (!userId) return;

    setError(null);  // Reset previous error
    
    try {
      const db = getFirestore();
      const cartRef = doc(db, 'carts', userId);
      await setDoc(cartRef, { items }, { merge: true });  // Merge cart data
      setCart(items);  // Update state after sync
    } catch (err) {
      setError(err.message);  // Set error state if something goes wrong
      console.error('Error syncing cart:', err);
    }
  };

  // Load cart on mount if userId exists
  useEffect(() => {
    if (userId) {
      loadCart();
    } else {
      setCart([]);  // If no userId, reset cart state
    }
  }, [userId]);

  return {
    cart,
    loadCart,
    syncCart,
    isLoading,
    error
  };
}
