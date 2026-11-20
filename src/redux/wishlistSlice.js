import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('stylestore_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Failed to load wishlist:', err);
    return [];
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      localStorage.setItem('stylestore_wishlist', JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem('stylestore_wishlist', JSON.stringify(state.items));
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
