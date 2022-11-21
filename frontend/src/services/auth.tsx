import React, { useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import axios, { AxiosError } from "axios";
import { formData } from "../components/loginPage";

export function useAuth() {
  return React.useContext(AuthContext);
}

type userInfo = {
  username: string;
  balance: number;
  token: string;
};

interface AuthContextType {
  user: any;
  signin: (user: formData) => Promise<any>;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = async (newUser: formData) => {
    const response = await api.post("/user/login", newUser);
    const data = response.data;
    const user: userInfo = {
      username: data.userDTO.username,
      balance: data.userDTO.balance,
      token: data.token,
    };

    localStorage.setItem("x-access-token", data.token);

    setUser(user);

    return response;
  };

  let signout = (callback: VoidFunction) => {
    localStorage.removeItem("x-access-token");

    setUser({ token: null });
    callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  console.log(location);

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user.username}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!localStorage.getItem("x-access-token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function CheckAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (
    location.pathname != "/expiredSession" &&
    localStorage.getItem("x-access-token")
  ) {
    console.log("vei...");
    return <Navigate to="/transactions" state={{ from: location }} replace />;
  }

  return children;
}
