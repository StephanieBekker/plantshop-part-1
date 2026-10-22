import { createSlice } from "@reduxjs/toolkit";

// The cart is shared between pages and resets when the browser reloads.
const initialState = {
  items: [],
  orderPlaced: false,
};

// Redux Toolkit uses Immer, allowing reducers to describe updates with mutation syntax.
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const quantity = newItem.quantity ?? 1;
      if (!Number.isSafeInteger(quantity) || quantity < 1) return;

      const existingItem = state.items.find((item) => item.id === newItem.id);
      // Keep combined quantities within JavaScript's exact integer range.
      if (existingItem && !Number.isSafeInteger(existingItem.quantity + quantity)) return;
      state.orderPlaced = false;

      // Cards add one item; product details can add a chosen quantity.
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity,
        });
      }
    },

    removeOne: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (!existingItem) return;

      existingItem.quantity -= 1;
      // Removing the final unit also removes the product row.
      if (existingItem.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    addOne: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem && Number.isSafeInteger(existingItem.quantity + 1)) {
        existingItem.quantity += 1;
      }
    },

    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      // Validate here too so every stored quantity remains an exact whole number.
      if (existingItem && Number.isSafeInteger(quantity) && quantity >= 1) {
        existingItem.quantity = quantity;
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      state.orderPlaced = false;
    },

    dismissOrderConfirmation: (state) => {
      state.orderPlaced = false;
    },

    completeOrder: (state) => {
      // Demo checkout clears the cart and enables the Home confirmation.
      state.items = [];
      state.orderPlaced = true;
    },
  },
});

// Action creators are imported by the components; the reducer goes in store.js.
export const {
  addToCart,
  removeOne,
  addOne,
  setQuantity,
  removeItem,
  clearCart,
  completeOrder,
  dismissOrderConfirmation,
} = cartSlice.actions;

export default cartSlice.reducer;
