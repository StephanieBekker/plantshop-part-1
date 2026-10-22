import ProductGridSkeleton from "../components/products/ProductGridSkeleton.jsx";
import { useSelector } from "react-redux";
import ProductCard from "../components/products/ProductCard.jsx";

function Shop() {
  const shopProducts = useSelector((state) => state.catalogue.items);
  const status = useSelector((state) => state.catalogue.status);
  const error = useSelector((state) => state.catalogue.error);
  const loading = status === "idle" || status === "loading";

  return (
    <div>
      <h1 id="shop-heading">Our plants</h1>

      {error && <p role="alert">{error}</p>}

      <section
        className="products"
        aria-labelledby="shop-heading"
        aria-busy={loading}
      >
        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="product-grid">
            {shopProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
export default Shop;
