import { Link } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm.jsx";

export default function Checkout() {
  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <Link className="back-link" to="/cart">← Back to Cart</Link>
      <CheckoutForm />
    </section>
  );
}
