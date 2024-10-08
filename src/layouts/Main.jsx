import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Main = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Improved Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
