import { store } from "../../app/store.js";
import products from "../../data/product.js";
import {
  catalogueStarted, catalogueLoaded, catalogueFailed,
  plantStarted, plantLoaded, plantFailed,
} from "./catalogueSlice.js";

// Fetch outside reducers; store both results and request status in Redux.
export async function loadCatalogue() {
  if (store.getState().catalogue.status !== "idle") return;
  store.dispatch(catalogueStarted());

  try {
    const response = await fetch("/api/plants");
    if (!response.ok) throw new Error("Catalogue request failed.");
    const result = await response.json();
    if (!Array.isArray(result.data)) throw new Error("Invalid catalogue.");

    // Preserve every local product and match live records by their stable API ID.
    const items = products.map((product) => {
      const plant = result.data.find((item) => item.id === product.trefleId);
      if (!plant?.scientific_name) throw new Error("Missing plant record.");
      return { ...product, name: plant.scientific_name };
    });
    store.dispatch(catalogueLoaded(items));
  } catch {
    store.dispatch(catalogueFailed());
  }
}

export async function loadPlant(id) {
  const status = store.getState().catalogue.detailStatus[id];
  // Loading also counts as cached: Strict Mode cannot start a duplicate request.
  if (status === "loading" || status === "succeeded") return;
  store.dispatch(plantStarted(id));

  try {
    const response = await fetch(`/api/plants?id=${id}`);
    if (!response.ok) throw new Error("Plant request failed.");
    const result = await response.json();
    if (result.data?.id !== id) throw new Error("The API returned the wrong plant.");
    store.dispatch(plantLoaded(result.data));
  } catch {
    store.dispatch(plantFailed(id));
  }
}
