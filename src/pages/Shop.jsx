import products from "../data/product.js";
import ProductCard from "../components/ProductCard.jsx";
import { useState, useEffect } from "react";

function Shop() {
  const [shopProducts, setShopProducts] = useState(products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchProducts() {
      const apiKey = import.meta.env.VITE_PERENUAL_API_KEY;
      const searchTerms = ["monstera", "dracaena"];
      const apiProducts = [];

      for (const searchTerm of searchTerms) {
        const response = await fetch(
          `https://perenual.com/api/v2/species-list?key=${apiKey}&q=${searchTerm}`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch products (HTTP ${response.status})`);
        }
        const data = await response.json();
        apiProducts.push(...data.data);
      }
      setShopProducts(
        products.map((product) => {
          const apiProduct = apiProducts.find(
            (plant) => plant.id === product.perenualId,
          );
          if (apiProduct) {
            const apiImage = apiProduct.default_image?.medium_url;
            return {
              ...product,
              name: apiProduct.common_name,
              image:
                !product.useLocalImage &&
                apiImage &&
                !apiImage.includes("upgrade_access")
                  ? apiImage
                  : product.image,
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
