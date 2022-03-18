import React from "react";
import { Outlet } from "react-router-dom";

export default function OutletLayout() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}
