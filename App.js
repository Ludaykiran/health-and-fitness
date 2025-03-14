import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Pricing from "./Pricing";
import Dashboard from "./Dashboard";
import Signup from "./SignUp";
import Shop from "./Shop";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"]; // Hide navbar on these pages

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />}/>
      </Routes>
    </>
  );
};
