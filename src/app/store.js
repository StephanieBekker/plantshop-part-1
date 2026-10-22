import { configureStore } from "@reduxjs/toolkit";
import catalogueReducer from "../features/catalogue/catalogueSlice.js";
import cartReducer from "../features/cart/cartSlice.js";

import products from "../data/product.js";
import { loadCart, saveCart } from "../features/cart/cartStorage.js";

const storageKey = "spire-part-1-cart";

// Restore saved selections before React reads the Redux store.
export const store = configureStore({
    // Register separate reducers for cart actions and cached API data.
    preloadedState: {
        cart: { items: loadCart(storageKey, products), orderPlaced: false },
    },
    reducer: {
        cart: cartReducer,
        catalogue: catalogueReducer,
    },
});
// Keep browser storage outside reducers and save only when cart items change.
let previousItems = store.getState().cart.items;
store.subscribe(() => {
    const items = store.getState().cart.items;
    if (items !== previousItems) {
        previousItems = items;
        saveCart(storageKey, items);
    }
});
