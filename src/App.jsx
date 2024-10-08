import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

import Main from "./layouts/Main";
import Auth from "./layouts/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth" element={<Navigate to="/auth/login" />} />
      </Route>
    </Routes>
  );
}

export default App;
