import sunIcon from "../assets/icons/sun.svg";
import waterIcon from "../assets/icons/droplet.svg";
import noteIcon from "../assets/icons/info.svg";

// Decorative icons accompany visible text labels.
const icons = {
  light: sunIcon,
  water: waterIcon,
  note: noteIcon,
};

export default function CareIcon({ type }) {
  return (
    <img className="care-icon" src={icons[type]} alt="" aria-hidden="true" />
  );
}
