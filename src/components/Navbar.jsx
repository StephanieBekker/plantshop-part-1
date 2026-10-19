import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import bagIcon from "../assets/shopping-bag.svg";

function Navbar() {
  const items = useSelector((state) => state.cart.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <NavLink className="brand" to="/">
        SPIRE
      </NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink
        className="cart-link"
        to="/cart"
        aria-label={`Cart with ${cartCount} items`}
      >
        <span className="cart-icon" aria-hidden="true">
          <img className="bag-icon" src={bagIcon} alt="" />

          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </span>
      </NavLink>
    </nav>
  );
}
export default Navbar;
