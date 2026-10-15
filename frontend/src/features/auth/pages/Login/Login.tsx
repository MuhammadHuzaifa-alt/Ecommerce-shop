import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

import Button from "../../../../shared/components/Button/Button";
import Input from "../../../../shared/components/Input/Input";
import PasswordInput from "../../../../shared/components/PasswordInput/PasswordInput";

import { loginUser } from "../../../../services/authService";
import { useAuth } from "../../../../hooks/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(formData);

      login(
        response.user,
        response.access,
        response.refresh,
        rememberMe
      );

      navigate("/products");
    } catch (error: unknown) {
      console.error("Login failed:", error);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-left">
        <div className="login-content">
          <span className="logo">ShopEase</span>

          <h1>Discover Amazing Products</h1>

          <p>
            Shop thousands of premium products with secure payments,
            fast delivery, and exclusive offers.
          </p>
        </div>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>

          <p>Sign in to continue shopping.</p>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="register-link">
            <span>Don't have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;