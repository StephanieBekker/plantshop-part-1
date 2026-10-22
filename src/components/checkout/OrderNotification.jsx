import Icon from "../ui/Icon.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissOrderConfirmation } from "../../features/cart/cartSlice.js";

export default function OrderNotification() {
  const dispatch = useDispatch();
  const orderPlaced = useSelector((state) => state.cart.orderPlaced);

  useEffect(() => {
    if (!orderPlaced) return;

    // The shared layout keeps this timer running when the route changes.
    const timer = setTimeout(() => dispatch(dismissOrderConfirmation()), 10000);
    return () => clearTimeout(timer);
  }, [orderPlaced, dispatch]);

  if (!orderPlaced) return null;

  return (
    <>
      {/* The visual backdrop highlights the notice without changing page navigation. */}
      <div className="order-confirmation-backdrop" aria-hidden="true" />
      <div className="order-confirmation">
        <Icon name="shoppingBag" size={64} className="order-confirmation-icon" />
        <div role="status">
          <strong>Thank you for your order!</strong>
          <p>Your demo order has been placed successfully!</p>
        </div>
        <button type="button" className="order-confirmation-shop"
          onClick={() => dispatch(dismissOrderConfirmation())}>
          Back to shopping
        </button>
      </div>
    </>
  );
}
