import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";
import Footer from "../components/Footer.jsx";

function Shop() {
  const shopProducts = useSelector((state) => state.catalogue.items);
  const status = useSelector((state) => state.catalogue.status);
  const error = useSelector((state) => state.catalogue.error);
  const loading = status === "idle" || status === "loading";

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

      <Footer />
    </div>
  );
}
export default Shop;
