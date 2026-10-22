import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice.js";
import CartItem from "./CartItem.jsx";

function CartContents() {
  // Read the shared cart items from Redux.
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  // Calculate the total from each price and quantity.
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="cart">
      <h2>Your items</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.length > 0 && (
        <div className="cart-columns" aria-hidden="true">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
      )}
      {items.length > 0 && (
        <ul className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      )}
      {/* The summary uses the same total as Checkout. */}
      {items.length > 0 && (
        <aside className="cart-summary" aria-labelledby="cart-summary-heading">
          <h2 id="cart-summary-heading">Order summary</h2>
          <div className="cart-total">
            <span>Total</span>
            <strong>{total} kr</strong>
          </div>

          <NavLink className="checkout-link" to="/checkout">
            Go to Checkout
          </NavLink>

          <button type="button" className="clear-cart" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </aside>
      )}
    </section>
  );
}

export default CartContents;
