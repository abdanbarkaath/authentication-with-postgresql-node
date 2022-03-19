import React from "react";
import axios from "../api/axios";
import { useAuthData } from "../contexts/auth-context";

export const useCheckAutherized = () => {
  const { setAuth } = useAuthData();
  const token = localStorage.getItem("auth");

  const authorized = async () => {
    //sends the cookie with response token
    const response = await axios.get("auth/is-verified", {
      withCredentials: true,
      headers: {
        token,
      },
    });

    setAuth((prev) => {
      return {
        ...prev,
        token: token,
        isAuthorized: response.data.isAuthorized,
      };
    });
    return response.data.isAuthorized;
  };

  return authorized;
};
