// Children place checkout actions below the product list and total.
export default function OrderSummary({ items, total, children }) {
  return (
    <section className="order-summary">
      <h2>Order summary</h2>

      <ul className="order-list">
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} width={64} height={80} />
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
      {children}
    </section>
  );
}
