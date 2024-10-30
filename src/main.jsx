import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename="/admin">
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
