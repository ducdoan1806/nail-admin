import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Products from "../pages/Products";

export const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: "fas fa-tachometer-alt",
    component: Dashboard(),
  },
  {
    name: "Products",
    path: "/products",
    icon: "fas fa-box",
    component: Products(),
  },
  {
    name: "Orders",
    path: "/orders",
    icon: "fas fa-shopping-cart",
    component: Orders(),
  },
];
