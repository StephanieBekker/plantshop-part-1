import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  removeOne,
  addOne,
  setQuantity,
  removeItem,
  clearCart,
} from "../features/cart/cartSlice.js";
import TrashIcon from "./TrashIcon.jsx";

function Cart() {
  // Read the shared cart items from Redux.
  const items = useSelector((state) => state.cart.items);
  // Dispatch actions to update cart state.
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
      {/* Render product rows only when the cart contains items. */}
      {items.length > 0 && (
        <ul className="cart-list">
          {/* Each product uses its stable ID as the React key. */}
          {items.map((item) => (
            <li key={item.id}>
              {/* The image URL belongs to the product stored in the cart. */}
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />
              <p className="cart-unit-price">
                <span className="cart-price-label">Each: </span>
                {item.price} kr
              </p>
              <h3>{item.name}</h3>
              {/* Line total = unit price multiplied by quantity. */}
              <p className="cart-item-total">{item.price * item.quantity} kr</p>
              <div className="quantity-controls">
                {/* Decrease this product by one unit. */}
                <button
                type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="remove-one"
                  onClick={() => dispatch(removeOne(item.id))}
                >
                  -
                </button>
                {/* The reducer rejects quantities that are not positive integers. */}
                <input
                  className="quantity-input"
                  type="number"
                  min="1"
                  step="1"
                  aria-label={`Quantity of ${item.name}`}
                  value={item.quantity}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    dispatch(
                      setQuantity({
                        id: item.id,
                        quantity: Number(e.target.value),
                      }),
                    )
                  }
                />
                {/* Increase this product by one unit. */}
                <button
                type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  className="add-one"
                  onClick={() => dispatch(addOne(item.id))}
                >
                  +
                </button>
              </div>
              {/* Remove the entire product row, regardless of quantity. */}
              <button
                type="button"
                className="remove-item"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => dispatch(removeItem(item.id))}
              >
                <TrashIcon />
                <span>Remove</span>
              </button>
            </li>
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

export default Cart;
