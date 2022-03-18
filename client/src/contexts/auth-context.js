import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({});

  const state = {
    auth,
    setAuth,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export const useAuthData = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthData must be with the auth context");
  }
  return context;
};
