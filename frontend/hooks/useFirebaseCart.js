// hooks/useFirebaseCart.js

import { useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

export function useFirebaseCart(userId) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load cart from Firestore
  const loadCart = async () => {
    if (!userId) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const db = getFirestore();
      const cartRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartRef);
      
      setIsLoading(false);
      
      if (cartDoc.exists()) {
        return cartDoc.data().items || [];
      }
      
      return [];
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      console.error('Error loading cart:', err);
      return [];
    }
  };

  // Sync cart to Firestore
  const syncCart = async (items) => {
    if (!userId) return;
    
    setError(null);
    
    try {
      const db = getFirestore();
      const cartRef = doc(db, 'carts', userId);
      await setDoc(cartRef, { items }, { merge: true });
    } catch (err) {
      setError(err.message);
      console.error('Error syncing cart:', err);
    }
  };

  return {
    loadCart,
    syncCart,
    isLoading,
    error
  };
}