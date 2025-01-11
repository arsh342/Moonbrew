import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer } from '../reducers/cartReducer';
import { useFirebaseCart } from '../hooks/useFirebaseCart';
import { cartService } from '../services/cartService';

const CartContext = createContext(undefined);

export function CartProvider({ children, userId }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { syncCart, loadCart, isLoading, error } = useFirebaseCart(userId);

  // Load cart from Firestore on mount
  useEffect(() => {
    const initializeCart = async () => {
      const items = await loadCart();
      items.forEach(item => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    };
    initializeCart();
  }, [userId]);

  // Sync cart to Firestore on changes
  useEffect(() => {
    if (state.items.length > 0) {
      syncCart(state.items);
    }
  }, [state.items]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });
    if (userId) {
      await cartService.clearCart(userId);
    }
  };

  return (
    <CartContext.Provider value={{
      cart: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}