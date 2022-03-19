import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/signup-page";
import DashboardPage from "./pages/dashboard/dashboard-page";
import OutletLayout from "./components/outlet-page/outlet-page";
import LoginPage from "./pages/login/login-page";
import RequireAuth from "./components/require-auth/require-auth";
import { useAuthData } from "./contexts/auth-context";
import User from "./pages/user/user";

const App = () => {
  const { auth } = useAuthData();
  console.log("auth", auth);

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<OutletLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
