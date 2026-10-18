import products from "./data/product.js";
import Header from "./components/Header.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Cart from "./components/Cart.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="shop-layout">
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

        <Cart />
      </main>
    </>
  );
}
export default App;
