import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { completeOrder, clearCart } from "../../features/cart/cartSlice.js";
import CheckoutFields from "./CheckoutFields.jsx";
import OrderSummary from "./OrderSummary.jsx";

export default function CheckoutForm() {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (items.length === 0) return;
    // Part 1 completes the demo in Redux; no form details leave the browser.
    dispatch(completeOrder());
    navigate("/");
  }

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <form className="checkout-layout" onSubmit={handleSubmit}>
      <CheckoutFields />
      <OrderSummary items={items} total={total}>
        <p>Demo checkout. Personal details are not saved or sent. No payment is taken.</p>
        <button className="place-order" type="submit">Place Order</button>
        <button className="clear-cart" type="button" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </OrderSummary>
    </form>
  );
}
