import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(true);

  // Check localStorage availability and load cart
  useEffect(() => {
    try {
      localStorage.getItem('cart');
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      setIsLocalStorageAvailable(false);
      console.error('localStorage not available:', error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLocalStorageAvailable) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isLocalStorageAvailable]);

  const addToCart = (item, quantity = 1) => {
    setCart(currentCart => {
      // Check if item already exists (without cartItemId)
      const existingItemIndex = currentCart.findIndex(
        cartItem => cartItem.id === item.id && 
        cartItem.size === item.size
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }

      // Create a unique cart item ID
      const newCartItemId = `${item.id}_${Date.now()}`;

      // Add the new item to the cart
      const newCartItem = {
        ...item,
        cartItemId: newCartItemId,
        quantity: quantity
      };

      toast.success('Added to cart!');
      return [...currentCart, newCartItem];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(currentCart => 
      currentCart.filter(item => item.cartItemId !== cartItemId)
    );
    toast.success('Removed from cart');
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
    if (isLocalStorageAvailable) {
      localStorage.removeItem('cart');
    }
    toast.success('Cart cleared');
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
