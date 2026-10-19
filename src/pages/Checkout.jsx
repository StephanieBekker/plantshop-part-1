import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";

function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlePlaceOrder() {
    dispatch(clearCart());
    navigate("/");
  }
  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} kr x {item.quantity}
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <div className="cart-total">
          <span>Total</span>
          <strong>{total} kr</strong>
        </div>
      )}
      <button className="PlaceOrder" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </section>
  );
}
export default Checkout;
