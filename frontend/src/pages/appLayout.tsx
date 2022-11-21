import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import api from "../services/api";
import { AuthStatus } from "../services/auth";

type usee = {
  username: string;
  balance: string;
};

type ContextType = { user: usee | null };

export default function AppLayout() {
  const [user, setUser] = React.useState<usee | null>(null);

  useEffect(() => {
    const getBalance = async () => {
      try {
        let config = {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        };

        const response = await api.get("/user/info", config);
        const data = response.data;

        if (!data.userDTO)
          return (
            <Navigate
              to="/expiredToken"
              state={{ from: "/transactions" }}
              replace
            />
          );
        console.log("SOCOOR");
        setUser(data.userDTO);
        console.log(user);
      } catch (e) {
        console.log("erooooooooooooo");
      }
    };

    getBalance();
  }, []);

  return (
    <>
      <AuthStatus />
      INFORMAÇÕES DA SIDEBAR: <hr />
      <Outlet context={{ user }} />
    </>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
