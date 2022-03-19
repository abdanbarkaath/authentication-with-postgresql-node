import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthData } from "../../contexts/auth-context";
import { useCheckAutherized } from "../../custom-hooks/use-check-autherized";
import { useNavigate } from "react-router-dom";

export default function PersistentLogin() {
  const [isLoading, setIsloading] = useState(true);
  const verify = useCheckAutherized();
  const { auth } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsVerified = async () => {
      try {
        const token = localStorage.getItem("auth");
        if (token) {
          await verify();
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    };
    !auth.token ? checkIsVerified() : setIsloading(false);
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}
