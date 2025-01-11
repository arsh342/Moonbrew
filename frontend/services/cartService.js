// services/cartService.js

import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

export const cartService = {
  /**
   * Clears all items from a user's cart in Firestore
   * @param {string} userId - The ID of the user whose cart to clear
   * @returns {Promise<void>}
   */
  async clearCart(userId) {
    if (!userId) {
      throw new Error('User ID is required to clear cart');
    }

    try {
      const db = getFirestore();
      const cartRef = doc(db, 'carts', userId);
      await deleteDoc(cartRef);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw new Error('Failed to clear cart');
    }
  }
};