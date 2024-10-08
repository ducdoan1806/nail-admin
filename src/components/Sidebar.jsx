import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menu } from "../utils/util";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const activePath = (path) => {
    return location.pathname.split("/")[1] === path.split("/")[1]
      ? "bg-gray-700 "
      : "";
  };
  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-60" : "w-12"
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
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              activePath(item.path) +
              "block py-3 px-4 hover:bg-gray-700 transition duration-200"
            }
          >
            <i className={item.icon + " mr-2"}></i>
            {isSidebarOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
