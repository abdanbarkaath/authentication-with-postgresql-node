import React from "react";
import axios from "../api/axios";
import { useAuthData } from "../contexts/auth-context";

export const useCheckAutherized = () => {
  const { setAuth, auth } = useAuthData();

  const authorized = async () => {
    //sends the cookie with response token
    const response = await axios.get("auth/is-verified", {
      withCredentials: true,
      headers: {
        token: auth.token,
      },
    });

    setAuth((prev) => {
      return { ...prev, isAuthorized: response.data.isAuthorized };
    });
    return response.data.isAuthorized;
  };

  return authorized;
};
