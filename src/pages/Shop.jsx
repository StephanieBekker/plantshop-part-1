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
        apiProducts.map((apiProduct) => {
          const product = products.find(
            (product) => product.trefleId === apiProduct.id,
          );

          if (!product) {
            throw new Error(
              `Missing local product data for ID ${apiProduct.id}`,
            );
          }

          return {
            ...product,
            name: apiProduct.scientific_name || product.name,
          };
        }),
      );
    }
    fetchProducts()
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 id="shop-heading">Our plants</h1>

      {loading && (
        <p className="sr-only" role="status">
          Loading plants...
        </p>
      )}

      {error && <p role="alert">{error}</p>}

      <section
        className="products"
        aria-labelledby="shop-heading"
        aria-busy={loading}
      >
        <div className="product-grid">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((placeholder) => (
                <div
                  className="product-card skeleton-card"
                  key={placeholder}
                  aria-hidden="true"
                >
                  <div className="skeleton-image" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line skeleton-short" />
                  <div className="skeleton-button" />
                </div>
              ))
            : shopProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>
          Data: <a href="https://trefle.io/">Trefle.io</a> (CC BY 4.0)
        </p>
      </footer>
    </div>
  );
}
export default Shop;
