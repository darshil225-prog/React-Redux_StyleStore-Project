import { createSlice } from '@reduxjs/toolkit';

// Load cart items from localStorage if available
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('stylestore_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (err) {
    console.error('Failed to load cart from storage:', err);
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
      localStorage.setItem('stylestore_cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem('stylestore_cart', JSON.stringify(state.items));
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem('stylestore_cart', JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // If quantity reaches 0, remove item
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      localStorage.setItem('stylestore_cart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('stylestore_cart');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
