import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => {
      fetch("https://localhost:7038/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: values.username, password: values.password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid credentials");
          }
          return response.text();
        })
        .then((data) => {
          const token = data;
          if (token) {
            localStorage.setItem("auth Token", token);
            login(true);
            navigate("/Navbar");
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
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && <div className="error">{formik.errors.username}</div>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && <div className="error">{formik.errors.password}</div>}
        </div>

        <button type="submit">Login</button>
        <span className="error-message">{errorMessage}</span>
      </form>
      <p>
        Don't have an account?{" "}
        <span className="signup-link" onClick={() => navigate("/signup")}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
