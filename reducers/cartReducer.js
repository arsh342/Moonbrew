const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Validate payload
      if (!action.payload || !action.payload.id) {
        console.error('Invalid payload for ADD_ITEM action: Missing item ID');
        return state;
      }

      // Find existing item
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      // Determine new quantity
      const quantity = action.payload.quantity || 1;

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (action.payload.price * quantity)
        };
      }

      // Add new item
      return {
        ...state,
        items: [
          ...state.items, 
          { 
            ...action.payload, 
            quantity: quantity 
          }
        ],
        totalItems: state.totalItems + quantity,
        totalPrice: state.totalPrice + (action.payload.price * quantity)
      };
    }

    case 'REMOVE_ITEM': {
      // Validate payload
      if (!action.payload) {
        console.error('Invalid payload for REMOVE_ITEM action: Missing item ID');
        return state;
      }

      // Find item to remove
      const itemToRemove = state.items.find(item => item.id === action.payload);
      
      if (!itemToRemove) {
        console.warn(`Item with ID ${action.payload} not found in cart`);
        return state;
      }

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
      };
    }

    case 'UPDATE_QUANTITY': {
      // Validate payload
      if (!action.payload || !action.payload.id || 
          typeof action.payload.quantity !== 'number' || 
          action.payload.quantity < 0) {
        console.error('Invalid payload for UPDATE_QUANTITY action');
        return state;
      }

      // Find item to update
      const itemToUpdateIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (itemToUpdateIndex === -1) {
        console.warn(`Item with ID ${action.payload.id} not found in cart`);
        return state;
      }

      const itemToUpdate = state.items[itemToUpdateIndex];
      const quantityDifference = action.payload.quantity - itemToUpdate.quantity;

      // Create updated items array
      const updatedItems = [...state.items];
      updatedItems[itemToUpdateIndex] = {
        ...itemToUpdate,
        quantity: action.payload.quantity
      };

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalPrice: state.totalPrice + (itemToUpdate.price * quantityDifference)
      };
    }

    case 'CLEAR_CART':
      return {
        ...initialState
      };

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};