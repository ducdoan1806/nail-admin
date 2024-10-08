import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename="">
      <App />
    </Router>
  </StrictMode>
);
