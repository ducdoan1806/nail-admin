import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-12"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1
          className={`text-2xl text-nowrap font-bold ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          Gạo Nails
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className=" text-white"
        >
          <i
            className={`fas ${
              isSidebarOpen ? "fa-chevron-left" : "fa-chevron-right"
            }`}
          ></i>
        </button>
      </div>
      <nav className="mt-8">
        <Link
          to="/"
          className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
        >
          <i className="fas fa-tachometer-alt mr-2"></i>
          {isSidebarOpen && <span>Dashboard</span>}
        </Link>
        <Link
          to="/products"
          className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
        >
          <i className="fas fa-box mr-2"></i>
          {isSidebarOpen && <span>Products</span>}
        </Link>
        <Link
          to="/orders"
          className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
        >
          <i className="fas fa-shopping-cart mr-2"></i>
          {isSidebarOpen && <span>Orders</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
