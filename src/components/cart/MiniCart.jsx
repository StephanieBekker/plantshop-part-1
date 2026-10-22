import { Link } from "react-router-dom";

// Present the existing Redux items without creating a second cart state.
export default function MiniCart({ items, open, onNavigate }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <aside className="mini-cart" aria-label="Cart preview" hidden={!open}>
      {items.length > 0 && <h2>Your cart</h2>}
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mini-cart-list">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  className="mini-cart-product"
                  to={`/shop/${item.id}`}
                  onClick={onNavigate}
                >
                  <img src={item.image} alt="" />
                  <span>
                    <strong>{item.name}</strong>
                    <span>Quantity: {item.quantity}</span>
                  </span>
                </Link>
                <strong>{item.price * item.quantity} kr</strong>
              </li>
            ))}
          </ul>
          <p className="mini-cart-total">
            <span>Total</span>
            <strong>{total} kr</strong>
          </p>
        </>
      )}
      {items.length > 0 && (
        <div className="mini-cart-actions">
          <Link to="/cart" onClick={onNavigate}>View cart</Link>
          <Link className="checkout-link" to="/checkout" onClick={onNavigate}>
            Checkout
          </Link>
        </div>
      )}
    </aside>
  );
}
