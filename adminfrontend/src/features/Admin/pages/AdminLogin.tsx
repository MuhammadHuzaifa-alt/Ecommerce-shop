import type { FormEvent } from "react";
import { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../styles/AdminLogin.css";
import { adminLogin } from "../services/adminLoginService";


// ==========================================================
// ADMIN LOGIN
// ==========================================================

const AdminLogin = () => {

  const navigate = useNavigate();


  // ========================================================
  // FORM STATE
  // ========================================================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  // ========================================================
  // UI STATE
  // ========================================================

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // ========================================================
  // LOGIN
  // ========================================================

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      const response =
        await adminLogin({
          email,
          password,
        });


      // ====================================================
      // LOGIN SUCCESS
      // ====================================================

      if (response.success) {

        const adminUser = {
          email: response.admin.email,
          role: response.admin.role,
        };


        /*
          Remember me:

          true  -> localStorage
          false -> sessionStorage
        */

        if (rememberMe) {

          localStorage.setItem(
            "adminUser",
            JSON.stringify(adminUser)
          );

          localStorage.setItem(
            "adminAccess",
            response.access
          );

          localStorage.setItem(
            "adminRefresh",
            response.refresh
          );


          // Remove old session data

          sessionStorage.removeItem(
            "adminUser"
          );

          sessionStorage.removeItem(
            "adminAccess"
          );

          sessionStorage.removeItem(
            "adminRefresh"
          );

        } else {

          sessionStorage.setItem(
            "adminUser",
            JSON.stringify(adminUser)
          );

          sessionStorage.setItem(
            "adminAccess",
            response.access
          );

          sessionStorage.setItem(
            "adminRefresh",
            response.refresh
          );


          // Remove old local data

          localStorage.removeItem(
            "adminUser"
          );

          localStorage.removeItem(
            "adminAccess"
          );

          localStorage.removeItem(
            "adminRefresh"
          );

        }


        navigate("/admin/dashboard");

      }

    } catch (error: unknown) {

      // ====================================================
      // BACKEND / NETWORK ERROR
      // ====================================================

      if (axios.isAxiosError(error)) {

        const data =
          error.response?.data;


        // Backend returned a response

        if (data?.message) {

          setError(
            data.message
          );

        } else if (data?.detail) {

          setError(
            data.detail
          );

        } else if (data?.errors) {

          setError(
            "Invalid admin email or password."
          );

        // Request was sent but no response received

        } else if (error.request) {

          setError(
            "Unable to connect to the server. Please try again."
          );

        } else {

          setError(
            "Something went wrong. Please try again."
          );

        }

      } else {

        // Unknown / non-Axios error

        setError(
          "Something went wrong. Please try again."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // ========================================================
  // RENDER
  // ========================================================

  return (

    <div className="admin-login-page">

      <div className="admin-login-card">


        {/* ==================================================
            BRAND
        ================================================== */}

        <div className="admin-login-brand">

          <div className="admin-brand-logo">
            A
          </div>

          <h1>
            Admin Panel
          </h1>

          <p>
            Manage your ecommerce store
          </p>

        </div>


        {/* ==================================================
            HEADING
        ================================================== */}

        <div className="admin-login-heading">

          <h2>
            Welcome back
          </h2>

          <p>
            Sign in to access your dashboard
          </p>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="admin-login-error">

            {error}

          </div>

        )}


        {/* ==================================================
            FORM
        ================================================== */}

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >


          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="admin-form-group">

            <label htmlFor="admin-email">
              Email Address
            </label>

            <div className="admin-input-wrapper">

              <FaEnvelope
                className="admin-input-icon"
              />

              <input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                autoComplete="email"
                required
              />

            </div>

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="admin-form-group">

            <label htmlFor="admin-password">
              Password
            </label>

            <div className="admin-input-wrapper">

              <FaLock
                className="admin-input-icon"
              />

              <input
                id="admin-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                autoComplete="current-password"
                required
              />


              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </button>

            </div>

          </div>


          {/* =================================================
              REMEMBER ME
          ================================================= */}

          <div className="admin-login-options">

            <label className="remember-me">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
              />

              <span>
                Remember me
              </span>

            </label>

          </div>


          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="admin-login-footer">

          <span>
            Secure Admin Portal
          </span>

        </div>


      </div>

    </div>

  );
};


export default AdminLogin;