import { configureStore } from "@reduxjs/toolkit";
import catalogueReducer from "../features/catalogue/catalogueSlice.js";
import cartReducer from "../features/cart/cartSlice.js";

// Create the shared Redux store.
export const store = configureStore({
    // Register separate reducers for cart actions and cached API data.
    reducer: {
        cart: cartReducer,
        catalogue: catalogueReducer,
    },
});