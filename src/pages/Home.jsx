import ProductGridSkeleton from "../components/products/ProductGridSkeleton.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard.jsx";
import products from "../data/product.js";

// Reuse catalogue products so Home and Shop share images, prices and cart actions.
const heroPlant = products.find((product) => product.id === 2);

function Home() {
  const catalogue = useSelector((state) => state.catalogue.items);
  const status = useSelector((state) => state.catalogue.status);
  const error = useSelector((state) => state.catalogue.error);
  const loading = status === "idle" || status === "loading";
  const featuredProducts = catalogue.filter((product) => [1, 2, 7].includes(product.id));

  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-copy">
          <p className="home-intro">Welcome to SPIRE</p>
          <h1 id="home-heading">A little green for your everyday</h1>
          <p className="home-description">
            Bring a little nature home. Find a plant that suits your space
            and your everyday.
          </p>
          <Link className="home-shop-link" to="/shop">
            Explore our plants
          </Link>
        </div>
        <Link
          className="home-hero-media"
          to={`/shop/${heroPlant.id}`}
          aria-label="Explore our Monstera"
        >
          <img
            src={heroPlant.gallery[1]}
            alt="A Monstera in a cream pot on a wooden table beside a sofa."
          />
        </Link>
      </section>

      <section className="home-featured" aria-labelledby="featured-heading">
        <div className="home-section-heading">
          <h2 id="featured-heading">Find your next green favourite</h2>
          <Link to="/shop">View all plants</Link>
        </div>
        {loading && <ProductGridSkeleton count={3} />}
        {error && <p role="alert">{error}</p>}
        {!loading && <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} headingLevel="h3" />
          ))}
        </div>}
      </section>
    </div>
  );
}

export default Home;
