// reducers/cartReducer.js

const initialState = {
  items: []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      if (!action.payload || !action.payload.id) {
        console.error('Invalid payload for ADD_ITEM action');
        return state;
      }

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

    case 'REMOVE_ITEM': {
      if (!action.payload) {
        console.error('Invalid payload for REMOVE_ITEM action');
        return state;
      }
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }

    case 'UPDATE_QUANTITY': {
      if (!action.payload || !action.payload.id || typeof action.payload.quantity !== 'number') {
        console.error('Invalid payload for UPDATE_QUANTITY action');
        return state;
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};
