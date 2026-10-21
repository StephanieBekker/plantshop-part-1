import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import MiniCart from "./MiniCart.jsx";
import bagIcon from "../assets/icons/shopping-bag.svg";

function Navbar() {
  const items = useSelector((state) => state.cart.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Keep the preview open while keyboard focus moves between its links.
  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setPreviewOpen(false);
    }
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavLink className="brand" to="/">SPIRE</NavLink>
      <NavLink className="nav-link" to="/shop">Shop</NavLink>

      <div
        className="cart-menu"
        onMouseEnter={() => setPreviewOpen(true)}
        onMouseLeave={(event) => {
          // Preserve the preview while a keyboard user is focused inside it.
          if (!event.currentTarget.contains(document.activeElement)) {
            setPreviewOpen(false);
          }
        }}
        onFocus={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPreviewOpen(true);
          }
        }}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setPreviewOpen(false);
            // Return focus before the preview links become hidden.
            event.currentTarget.querySelector(".cart-link").focus();
          }
        }}
      >
        {/* The cart link also works normally on mobile and touch screens. */}
        <NavLink
          className="cart-link nav-link"
          to="/cart"
          aria-label={`Cart with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          onClick={() => setPreviewOpen(false)}
        >
          <span className="cart-icon" aria-hidden="true">
            <img className="bag-icon" src={bagIcon} alt="" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </span>
        </NavLink>
        <MiniCart
          items={items}
          open={previewOpen}
          onNavigate={() => setPreviewOpen(false)}
        />
      </div>
    </nav>
  );
}

export default Navbar;
