import products from "../data/product.js";
import ProductCard from "../components/ProductCard.jsx";

function Shop() {
  return (
    <div>
      <h1>Shop</h1>
      <section className="products" aria-labelledby="products-heading">
        <h2 id="products-heading" className="products-heading">
          Products
        </h2>

        <div className="product-grid">
          {/* map opretter et ProductCard for hvert produkt i produktlisten */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
export default Shop;
