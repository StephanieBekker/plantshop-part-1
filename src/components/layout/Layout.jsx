import OrderNotification from "../checkout/OrderNotification.jsx";
import Footer from "./Footer.jsx";
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
      <Footer />
    </div>
  );
}
export default Layout;
