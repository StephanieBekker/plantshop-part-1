import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeOne } from "../features/cart/cartSlice";
import { addOne } from "../features/cart/cartSlice";
import { setQuantity } from "../features/cart/cartSlice";
import { removeItem } from "../features/cart/cartSlice";
import TrashIcon from "./TrashIcon.jsx";
import { clearCart } from "../features/cart/cartSlice";
import { NavLink } from "react-router-dom";

function Cart() {
  // useSelector henter kurvens produkter fra Redux state
  const items = useSelector((state) => state.cart.items);
  // dispatch sender actions fra komponenten til Redux
  const dispatch = useDispatch();
  // Beregner samlet pris for alle produkter i kurven
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="cart">
      <h2>Your items</h2>
      {items.length === 0 && <p> Cart is empty</p>}
      {items.length > 0 && (
        <div className="cart-columns" aria-hidden="true">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
      )}
      {/* Viser listen, når kurven har mindst et produkt */}
      {items.length > 0 && (
        <ul className="cart-list">
          {/* map laver et listepunkt for hvert produkt i Redux*/}
          {items.map((item) => (
            <li key={item.id}>
              {/* Viser produktets billede fra Redux */}
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
              {/* Viser samlet pris for dette produkt ud fra antal */}
              <p className="cart-item-total">{item.price * item.quantity} kr</p>
              <div className="quantity-controls">
                {/* Sender produktets id som payload til removeOne */}
                <button
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="remove-one"
                  onClick={() => dispatch(removeOne(item.id))}
                >
                  -
                </button>
                {/* Lader brugeren skrive quantity direkte */}
                <input
                  className="quantity-input"
                  type="number"
                  min="1"
                  aria-label={`Quantity of ${item.name}`}
                  value={item.quantity}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    dispatch(
                      setQuantity({
                        id: item.id,
                        quantity: parseInt(e.target.value, 10),
                      }),
                    )
                  }
                />
                {/* Sender produktets id som payload til addOne */}
                <button
                  aria-label={`Increase quantity of ${item.name}`}
                  className="add-one"
                  onClick={() => dispatch(addOne(item.id))}
                >
                  +
                </button>
              </div>
              {/* Sender produktets id som payload til removeItem */}
              <button
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
      {/* Viser samlet pris under produktlisten */}
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

          <button className="clear-cart" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </aside>
      )}
    </section>
  );
}

export default Cart;
