import { getFirestore, doc, deleteDoc, getDoc } from 'firebase/firestore';

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

      // Check if the cart exists
      const cartSnapshot = await getDoc(cartRef);
      if (!cartSnapshot.exists()) {
        throw new Error('No cart found for the given user ID');
      }

      // Clear the cart by deleting the document (or empty the items array if you have one)
      await deleteDoc(cartRef);
      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw new Error(`Failed to clear cart: ${error.message}`);
    }
  }
};
