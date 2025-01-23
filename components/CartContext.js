import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(currentCart => {
      // Create a unique cart item ID
      const newCartItemId = `${item.id}_${Date.now()}`;

      // Add the new item to the cart
      return [...currentCart, {
        ...item,
        cartItemId: newCartItemId,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(currentCart => 
      currentCart.filter(item => item.cartItemId !== cartItemId)
    );
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
      return;
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => 
      count + item.quantity, 0
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total: getCartTotal(),
      itemCount: getItemCount()
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