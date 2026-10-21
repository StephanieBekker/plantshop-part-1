import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { completeOrder } from "../features/cart/cartSlice.js";

function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // This demo changes Redux state only; form details are never sent or stored.
  function handlePlaceOrder() {
    dispatch(completeOrder());
    navigate("/");
  }
  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <NavLink className="back-link" to="/cart">
        ← Back to Cart
      </NavLink>
      {items.length === 0 && <p>Your cart is empty</p>}
      {/* An empty cart cannot display or submit the checkout form. */}
      {items.length > 0 && (
        <form
          className="checkout-layout"
          onSubmit={(event) => {
            event.preventDefault();
            handlePlaceOrder();
          }}
        >
          <section className="order-products">
            <h2>Your details</h2>
            <div className="checkout-fields">
              <label>
                Full Name
                <input name="fullName" autoComplete="name" required />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Address
                <input name="address" autoComplete="street-address" required />
              </label>
              <label>
                Postal Code
                <input name="postalCode" autoComplete="postal-code" required />
              </label>
              <label>
                City
                <input name="city" autoComplete="address-level2" required />
              </label>
            </div>
          </section>

          <section className="order-summary">
            <h2>Order summary</h2>
            <ul className="order-list">
              {items.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <strong>{item.price * item.quantity} kr</strong>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Total</span>
              <strong>{total} kr</strong>
            </div>
            <p>Demo checkout. Details are not saved or sent.</p>
            <button className="place-order" type="submit">
              Place Order
            </button>
          </section>
        </form>
      )}
    </section>
  );
}
export default Checkout;
