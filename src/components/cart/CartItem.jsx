import { useDispatch } from "react-redux";
import { removeOne, addOne, setQuantity, removeItem } from "../../features/cart/cartSlice.js";
import Icon from "../ui/Icon.jsx";

// Each row dispatches changes to the same Redux cart used by checkout.
export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <li>
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
      <p className="cart-item-total">{item.price * item.quantity} kr</p>
      <div className="quantity-controls">
        <button
        type="button"
          aria-label={`Decrease quantity of ${item.name}`}
          className="remove-one"
          onClick={() => dispatch(removeOne(item.id))}
        >
          -
        </button>
        <input
          className="quantity-input"
          type="number"
          min="1"
          max={Number.MAX_SAFE_INTEGER}
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
        <button
        type="button"
          aria-label={`Increase quantity of ${item.name}`}
          className="add-one"
          onClick={() => dispatch(addOne(item.id))}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="remove-item"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => dispatch(removeItem(item.id))}
      >
        <Icon name="trash" size={16} className="trash-icon" />
        <span>Remove</span>
      </button>
    </li>
  );
}
