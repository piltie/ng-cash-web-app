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
  //let auth = useAuth();
  let location = useLocation();

  if (!localStorage.getItem("x-access-token")) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (localStorage.getItem("x-access-token") === undefined) {
    return <Navigate to="/expiredToken" state={{ from: location }} replace />;
  }

  return children;
}

export function CheckAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (
    location.pathname != "/expiredSession" &&
    localStorage.getItem("x-access-token")
  ) {
    console.log("ue");
    return <Navigate to="/transactions" state={{ from: location }} replace />;
  }

  return children;
}
