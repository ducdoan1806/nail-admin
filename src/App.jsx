import { Navigate, Route, Routes } from "react-router-dom";

import Main from "./layouts/Main";
import Auth from "./layouts/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Setting from "./pages/Setting";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="*" element={<Navigate to="/" />} />
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
