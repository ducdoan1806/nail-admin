import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../features/auth/api";
import { isAuthenticated } from "../utils/util";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

const Login = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ username: "", password: "" });
  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginApi(login));
  };
  const { loaded, error, loading } = useSelector((state) => state.auth);

  return (
    <AuthLayout
      title="Sign in to your account"
      link="/auth/register"
      linkName="Register now"
    >
      {(loaded || isAuthenticated()) && <Navigate to="/" />}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error?.error && <Notification content={error?.error} isError={true} />}
        <Input
          id="username"
          name="username"
          type="text"
          required
          value={login?.username}
          onChange={handleLogin}
          title={"User name"}
        />
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={login?.password}
          onChange={handleLogin}
          title={"Password"}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none ${
              loading ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? <Loading size="w-6 h-6" /> : " Sign in"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
