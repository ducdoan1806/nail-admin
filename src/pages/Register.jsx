import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import http from "../app/http";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
const Register = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({ error: "", info: "" });
  const handleChangeInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (info.password !== info.repeatPassword) {
        setNotification({ ...notification, error: "Password is not match" });
        setLoading(false);
        return;
      }
      const res = await http.post(
        "/nail/register/",
        JSON.stringify({
          email: info?.email.trim(),
          username: info?.username.trim(),
          password: info?.password.trim(),
          first_name: info?.first_name.trim(),
          last_name: info?.last_name.trim(),
        })
      );
      if (res?.data?.status) {
        setNotification({
          info: res?.data?.message,
          error: "",
        });
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotification({
        ...notification,
        error: error?.response?.data?.message,
      });
    }
  };

  return (
    <AuthLayout
      title="Register your account"
      link="/auth/login"
      linkName="Login now"
    >
      <form className="space-y-4" onSubmit={handleSubmit} method="POST">
        {notification?.error && (
          <Notification content={notification?.error} isError={true} />
        )}
        {notification?.info && (
          <Notification content={notification?.info} isError={false} />
        )}
        <div className="flex gap-4">
          <Input
            id="first_name"
            name="first_name"
            type="text"
            required
            value={info?.first_name}
            onChange={handleChangeInfo}
            title={"First name"}
            autoFocus
          />
          <Input
            id="last_name"
            name="last_name"
            type="text"
            required
            value={info?.last_name}
            onChange={handleChangeInfo}
            title={"Last name"}
          />
        </div>

        <Input
          id="username"
          name="username"
          type="text"
          required
          value={info?.username}
          onChange={handleChangeInfo}
          title={"Username"}
        />
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={info?.email}
          onChange={handleChangeInfo}
          title={"Email address"}
        />
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={info?.password}
          onChange={handleChangeInfo}
          title={"Password"}
        />
        <Input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          required
          value={info?.repeatPassword}
          onChange={handleChangeInfo}
          title={"Retype password"}
        />
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none ${
              loading ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? <Loading size={6} /> : "Register"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
