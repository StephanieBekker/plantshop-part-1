import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissOrderConfirmation } from "../features/cart/cartSlice.js";

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
        {/* This decorative SVG uses the same stroke style as our other icons. */}
        <svg className="order-confirmation-icon" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" />
        </svg>
        <div role="status">
          <strong>Thank you for your order!</strong>
          <p>Your demo order is complete. No payment has been taken.</p>
        </div>
        <button type="button" className="order-confirmation-shop"
          onClick={() => dispatch(dismissOrderConfirmation())}>
          Back to shopping
        </button>
      </div>
    </>
  );
}
