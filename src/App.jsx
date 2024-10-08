import { Navigate, Route, Routes } from "react-router-dom";

import Main from "./layouts/Main";
import Auth from "./layouts/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { menu } from "./utils/util";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {menu.map((item) => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
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
