import sun from "../../assets/icons/sun.svg";
import droplet from "../../assets/icons/droplet.svg";
import info from "../../assets/icons/info.svg";
import shoppingBag from "../../assets/icons/shopping-bag.svg";
import trash from "../../assets/icons/trash.svg";

const icons = { sun, droplet, info, shoppingBag, trash };

// Visible text or the surrounding control provides the accessible label.
export default function Icon({ name, size = 18, className = "" }) {
  return <img src={icons[name]} width={size} height={size}
    className={className} alt="" aria-hidden="true" />;
}
