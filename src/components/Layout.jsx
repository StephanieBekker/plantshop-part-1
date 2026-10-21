import OrderNotification from "./OrderNotification.jsx";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

// Outlet replaces the page content while Navbar stays shared.
function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <OrderNotification />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
