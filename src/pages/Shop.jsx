import products from "../data/product.js";
import ProductCard from "../components/ProductCard.jsx";
import { useState, useEffect } from "react";

function Shop() {
  const [shopProducts, setShopProducts] = useState(products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/plants");
      if (!response.ok) {
        throw new Error(`Failed to fetch products (HTTP ${response.status})`);
      }
      const data = await response.json();
      const apiProducts = data.data;
      setShopProducts(
        products.map((product) => {
          const apiProduct = apiProducts.find(
            (plant) => plant.id === product.trefleId,
          );
          if (apiProduct) {
            return {
              ...product,
              name: apiProduct.scientific_name || product.name,
            };
          }
          return product;
        }),
      );
    }
    fetchProducts()
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      {loading && <p role="status">Loading products...</p>}
      {error && <p role="alert">{error}</p>}
      <section className="products" aria-labelledby="products-heading">
        <h2 id="products-heading" className="products-heading">
          Products
        </h2>
        <p>
          Data: <a href="https://trefle.io/">Trefle.io</a> (CC BY 4.0)
        </p>
        <div className="product-grid">
          {/* map opretter et ProductCard for hvert produkt i produktlisten */}
          {shopProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
export default Shop;
