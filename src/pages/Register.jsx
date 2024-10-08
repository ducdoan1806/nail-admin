import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log("Login attempted with:", email, password);
  };

  return (
    <AuthLayout
      title="Register your account"
      link="/auth/login"
      linkName="Login now"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          title={"Email address"}
        />
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          title={"Password"}
        />

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Register
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
