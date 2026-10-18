import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider gør Redux store tilgængelig for komponenterne i App */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
