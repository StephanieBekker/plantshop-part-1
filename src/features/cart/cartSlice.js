import { createSlice } from "@reduxjs/toolkit";

// initialState beskriver, hvordan kurven ser ud i Redux fra starten
const initialState = {
    items: [],
    orderPlaced: false,
}

// createSlice samler kurvens startdata og reducers ét sted
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // En reducer bestemmer, hvordan state ændres, når en action kommer
        addToCart: (state, action) => {
            state.orderPlaced = false;

            // action.payload er produktet, som brugeren valgte
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            //Produktet findes allerede, øger antal
            if (existingItem) {
                existingItem.quantity++;

            } else {
                //Produktet findes ikke, tilføjer det med antal 1
                state.items.push({
                    image: action.payload.image,
                    name: action.payload.name,
                    price: action.payload.price,

                    id: action.payload.id,
                    quantity: 1,
                });
            }
        },
        // Reducer der sænker quantity eller fjerner produktet fra kurven
        removeOne: (state, action) => {
            // action.payload indeholder id på produktet, der skal ændres
            const id = action.payload;
            // find søger efter produktet med samme id i state
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                // Hvis produktet findes, sænkes quantity med 1
                existingItem.quantity--;
                // Hvis quantity er 0, fjernes produktet fra kurven
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter((item) => item.id !== id);
                }
            }
        },
        // Reducer der øger quantity med 1
        addOne: (state, action) => {
            // action.payload indeholder id på produktet, der skal ændres
            const id = action.payload;
            // find søger efter produktet med samme id i state
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                // Hvis produktet findes, øges quantity med 1
                existingItem.quantity++;
            }
        },
        // Reducer der tømmer kurven
        clearCart: (state) => {
            // Tømmer listen med produkter
            state.items = [];
            state.orderPlaced = false;
        },

        completeOrder: (state) => {
            state.items = [];
            state.orderPlaced = true;
        },

        // Reducer der ændrer quantity til det antal brugeren skriver
        setQuantity: (state, action) => {
            // Henter id og quantity fra action.payload
            const { id, quantity } = action.payload;

            // find søger efter produktet med samme id i state
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem && quantity >= 1) {
                // Opdaterer quantity med det antal brugeren skriver
                existingItem.quantity = quantity;
            }
        },
        // Reducer der fjerner alle eksemplarer af produktet
        removeItem: (state, action) => {
            // action.payload indeholder id på produktet, der skal fjernes
            const id = action.payload;
            // filter fjerner produktet med samme id fra state
            state.items = state.items.filter((item) => item.id !== id);
        }


    },
});

// Eksporterer addToCart, så komponenter kan sende actionen med dispatch
export const { addToCart } = cartSlice.actions;
// Eksporterer removeOne, så komponenter kan sende actionen med dispatch
export const { removeOne } = cartSlice.actions;
// Eksporterer completeOrder, så komponenter kan sende actionen med dispatch
export const { completeOrder } = cartSlice.actions;
// Eksporterer addOne, så komponenter kan sende actionen med dispatch
export const { addOne } = cartSlice.actions;
// Eksporterer clearCart, så komponenter kan sende actionen med dispatch
export const { clearCart } = cartSlice.actions;
// Eksporterer setQuantity, så komponenter kan sende actionen med dispatch
export const { setQuantity } = cartSlice.actions;
// Eksporterer removeItem, så komponenter kan sende actionen med dispatch
export const { removeItem } = cartSlice.actions;

// Eksporterer reduceren, så store.js kan bruge logikken i Redux
export default cartSlice.reducer;

