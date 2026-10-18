import { createSlice } from "@reduxjs/toolkit";

// initialState beskriver, hvordan profitten ser ud i Redux fra starten
const initialState = {
    totalProfit: 0,
};

const profitSlice = createSlice({
    name: "profit",
    initialState,
    reducers: {
        sellPlant: (state) => {
            state.totalProfit += 5;
        },
        buyPlant: (state) => {
            state.totalProfit -= 2;
        }
    },
});

export const { sellPlant, buyPlant } = profitSlice.actions;
export default profitSlice.reducer;
