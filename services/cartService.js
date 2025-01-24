import { 
  getFirestore, 
  doc, 
  deleteDoc, 
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export const cartService = {
  /**
   * Clears all items from a user's cart in Firestore
   * @param {string} userId - The ID of the user whose cart to clear
   * @returns {Promise<void>}
   */
  async clearCart(userId) {
    this._validateUserId(userId);

    try {
      const db = getFirestore();
      const cartRef = doc(db, 'carts', userId);

      // Soft delete: Update cart to empty state instead of deleting
      await updateDoc(cartRef, {
        items: [],
        updatedAt: new Date(),
        status: 'empty'
      });

      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Cart Clearing Error:', error);
      throw new Error(`Cart Clearing Failed: ${error.message}`);
    }
  },

  /**
   * Adds an item to the user's cart
   * @param {string} userId - The ID of the user
   * @param {Object} item - The item to add to the cart
   * @returns {Promise<Object>} Updated cart
   */
  async addToCart(userId, item) {
    this._validateUserId(userId);
    this._validateCartItem(item);

    try {
      const db = getFirestore();
      const cartRef = doc(db, 'carts', userId);
      const cartSnapshot = await getDoc(cartRef);

      let updatedCart;
      if (cartSnapshot.exists()) {
        const existingCart = cartSnapshot.data();
        const existingItemIndex = existingCart.items.findIndex(
          existingItem => existingItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          // Update existing item quantity
          existingCart.items[existingItemIndex].quantity += item.quantity || 1;
          updatedCart = existingCart;
        } else {
          // Add new item
          updatedCart = {
            ...existingCart,
            items: [...existingCart.items, item]
          };
        }

        await updateDoc(cartRef, {
          ...updatedCart,
          updatedAt: new Date(),
          status: 'active'
        });
      } else {
        // Create new cart if it doesn't exist
        updatedCart = {
          userId,
          items: [item],
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active'
        };

        await setDoc(cartRef, updatedCart);
      }

      return updatedCart;
    } catch (error) {
      console.error('Add to Cart Error:', error);
      throw new Error(`Add to Cart Failed: ${error.message}`);
    }
  },

  /**
   * Validates user ID
   * @private
   * @param {string} userId - User ID to validate
   * @throws {Error} If user ID is invalid
   */
  _validateUserId(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
  },

  /**
   * Validates cart item
   * @private
   * @param {Object} item - Cart item to validate
   * @throws {Error} If item is invalid
   */
  _validateCartItem(item) {
    if (!item || !item.id) {
      throw new Error('Invalid cart item: ID is required');
    }
    if (!item.name) {
      throw new Error('Invalid cart item: Name is required');
    }
    if (typeof item.price !== 'number' || item.price <= 0) {
      throw new Error('Invalid cart item: Price must be a positive number');
    }
  }
};