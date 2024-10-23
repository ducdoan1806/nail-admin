import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserApi } from "../features/auth/api";
import Loading from "../components/Loading";
import { categoryApi } from "../features/categories/api";

const Main = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(categoryApi());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUserApi());
  }, [dispatch]);
  return (
    <div className="flex h-screen bg-gray-100">
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
          <Loading />
        </div>
      )}
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
