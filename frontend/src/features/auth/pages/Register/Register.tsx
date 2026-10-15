import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Register.css";

import Button from "../../../../shared/components/Button/Button";
import Input from "../../../../shared/components/Input/Input";
import PasswordInput from "../../../../shared/components/PasswordInput/PasswordInput";

import { registerUser } from "../../../../services/authService";

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      return false;
    }

    if (!formData.password) {
      setError("Password is required.");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    if (!formData.confirmPassword) {
      setError("Please confirm your password.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Prevent duplicate requests
    if (loading) {
      return;
    }

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      /*
       * Send all fields required by the Django serializer.
       *
       * confirmPassword is checked on the frontend
       * and also sent to Django for server-side validation.
       */
      const payload = {
        fullname: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      console.log("Registration Payload:", payload);

      const response = await registerUser(payload);

      console.log("Registration successful:", response);

      setSuccess(
        "Registration successful! You can now login."
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      console.error("Registration failed:", error);

      if (axios.isAxiosError(error)) {
        console.error(
          "HTTP Status:",
          error.response?.status
        );

        console.error(
          "Backend Response:",
          error.response?.data
        );

        const data = error.response?.data;

        // Backend returned a string
        if (typeof data === "string") {
          setError(data);
        }

        // Backend returned:
        // { message: "Registration failed" }
        else if (data?.message) {
          setError(data.message);
        }

        // Backend returned validation errors
        else if (
          data &&
          typeof data === "object"
        ) {
          const messages = Object.entries(data)
            .map(([field, value]) => {
              if (Array.isArray(value)) {
                return `${field}: ${value.join(", ")}`;
              }

              if (typeof value === "string") {
                return `${field}: ${value}`;
              }

              return `${field}: ${JSON.stringify(value)}`;
            })
            .join(" | ");

          setError(
            messages ||
              "Registration failed. Please check your information."
          );
        }

        // No useful backend response
        else {
          setError(
            "Registration failed. Please try again."
          );
        }
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">

      {/* LEFT SIDE */}
      <div className="register-left">
        <div className="register-content">
          <span className="logo">
            ShopEase
          </span>

          <h1>
            Create Your Account
          </h1>

          <p>
            Join thousands of happy customers and
            enjoy secure shopping, exclusive offers,
            and fast delivery.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="register-right">
        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          <h2>
            Create Account
          </h2>

          <p>
            Fill in your information below.
          </p>

          {/* ERROR */}
          {error && (
            <div
              className="register-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div
              className="register-success"
              role="status"
            >
              {success}
            </div>
          )}

          {/* FULL NAME */}
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            placeholder="Enter your full name"
            onChange={handleChange}
          />

          {/* EMAIL */}
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />

          {/* PHONE */}
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            placeholder="Create a password"
            onChange={handleChange}
          />

          {/* CONFIRM PASSWORD */}
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleChange}
          />

          {/* SUBMIT */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          {/* LOGIN LINK */}
          <div className="login-link">
            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
