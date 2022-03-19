import React from "react";
import { navigate, useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/");
  };

  return (
    <div>
      <div>User</div>
      <button onClick={navigateTo}>dahbaord</button>
    </div>
  );
}
