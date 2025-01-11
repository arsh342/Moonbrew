// reducers/cartReducer.js

export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        
        if (existingItem) {
          // If item exists, increment quantity
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                : item
            )
          };
        }
        
        // If item doesn't exist, add it with quantity
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
        };
      }
  
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload)
        };
  
      case 'UPDATE_QUANTITY':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
        };
  
      case 'CLEAR_CART':
        return {
          ...state,
          items: []
        };
  
      default:
        return state;
    }
  };