import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import profitReducer from "../features/profit/profitSlice.js";

// configureStore opretter Redux store, som samler appens state
export const store = configureStore({
    // cartReducer styrer kurvens state
    reducer: {
        cart: cartReducer,
        profit: profitReducer,
    },
});