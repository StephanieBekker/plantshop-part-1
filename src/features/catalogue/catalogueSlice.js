import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/product.js";

// Keep API data between routes. A browser reload creates a fresh store.
const catalogueSlice = createSlice({
  name: "catalogue",
  initialState: {
    items: products,
    status: "idle",
    error: "",
    details: {},
    detailStatus: {},
    detailErrors: {},
  },
  reducers: {
    catalogueStarted(state) {
      state.status = "loading";
      state.error = "";
    },
    catalogueLoaded(state, action) {
      state.items = action.payload;
      state.status = "succeeded";
    },
    catalogueFailed(state) {
      state.status = "failed";
      state.error = "Live plant information is unavailable. You can still browse our plants.";
    },
    plantStarted(state, action) {
      state.detailStatus[action.payload] = "loading";
      state.detailErrors[action.payload] = "";
    },
    plantLoaded(state, action) {
      const plant = action.payload;
      state.details[plant.id] = plant;
      state.detailStatus[plant.id] = "succeeded";
      // A direct product visit also updates its name in the shared catalogue.
      const product = state.items.find((item) => item.trefleId === plant.id);
      if (product && plant.scientific_name) product.name = plant.scientific_name;
    },
    plantFailed(state, action) {
      state.detailStatus[action.payload] = "failed";
      state.detailErrors[action.payload] = "Plant information is unavailable right now. Please try again later.";
    },
  },
});

export const {
  catalogueStarted, catalogueLoaded, catalogueFailed,
  plantStarted, plantLoaded, plantFailed,
} = catalogueSlice.actions;
export default catalogueSlice.reducer;
