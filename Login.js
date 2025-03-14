import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = ({ login }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validate: (values) => {
      let errors = {};
      if (!values.username.trim()) {
        errors.username = "Username is required"; // ✅ Check if empty
      }
      if (!values.password.trim()) {
        errors.password = "Password is required"; // ✅ Check if empty
      }
      return errors;
    },
    onSubmit: (values) => {
      fetch("https://localhost:7038/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          return response.json().then((data) => {
            if (!response.ok) {
              throw new Error(data.message || "Invalid credentials");
            }
            return data;
          });
        })
        .then((data) => {
          const token = data.token;
          if (token) {
            localStorage.setItem("authToken", token);
            login(true);
            navigate("/dashboard");
          } else {
            throw new Error("Token not received");
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    },
  });

  return (
    <div className="main-container">
      <div className="image"></div>
      <div className="login-container">
        <h1 className="login-heading">Welcome to Login page</h1>
        <p className="para">Please enter your login details</p>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // ✅ Prevents instant error display
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="login-button" disabled={!formik.isValid || formik.isSubmitting}>
            Login
          </button>
          <span className="error-message">{errorMessage}</span>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

