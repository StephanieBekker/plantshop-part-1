// useDispatch giver adgang til dispatch, som sender en action til Redux
import { useDispatch } from "react-redux";
// addToCart er en action creator: den laver beskeden til Redux
import { addToCart } from "../features/cart/cartSlice";

// product er en prop: produktdata, som Shop sender til dette produktkort
export default function ProductCard({ product }) {
  // dispatch sender en action, når brugeren klikker på knappen
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} kr</p>
      <button
        className="add-to-cart"
        // Sender produktet som action payload til cart-reduceren
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </article>
  );
}
