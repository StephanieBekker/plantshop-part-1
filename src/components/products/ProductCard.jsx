import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice.js";
import plantDetails from "../../data/plantDetails.js";

export default function ProductCard({ product, headingLevel = "h2" }) {
  const dispatch = useDispatch();
  const Heading = headingLevel;

  // Shop and related products share this description and card component.
  const fact = plantDetails[product.trefleId]?.description;

  return (
    <article className="product-card">
      <Link
        className="product-image-link"
        to={`/shop/${product.id}`}
        aria-label={`View ${product.name}`}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <Heading>
        <Link to={`/shop/${product.id}`}>{product.name}</Link>
      </Heading>

      {fact && <p className="product-fact">{fact}</p>}
      <p>{product.price} kr</p>

      <button
        className="add-to-cart"
        type="button"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </article>
  );
}
