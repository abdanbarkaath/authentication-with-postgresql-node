import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  const moveTo = () => {
    console.log("here");
    navigate("/user");
  };

  return (
    <div>
      dashboard-page<button onClick={moveTo}> userpage</button>
    </div>
  );
}
