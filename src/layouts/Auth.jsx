import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default Auth;
