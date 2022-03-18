import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/signup-page";
import LoginPage from "./pages/login/login-page";
import DashboardPage from "./pages/dashboard/dashboard-page";
import axios from "axios";
import { useEffect } from "react";
import { basePath } from "./ui.config";

const App = () => {
  const checkAutherized = () => {
    const auth = localStorage.getItem("auth");
    console.log(auth, "auth");
    if (auth) {
      axios
        .get(`${basePath}/auth/is-verified`, {
          headers: {
            token: auth,
          },
        })
        .then((reponse) => {
          console.log(reponse);
        });
    }
  };

  useEffect(() => {
    checkAutherized();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
