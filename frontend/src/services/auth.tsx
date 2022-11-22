import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { formData } from "../components/auth/loginPage";

import api from "../services/api";

export function useAuth() {
  return React.useContext(AuthContext);
}

interface AuthContextType {
  signin: (user: formData) => Promise<any>;
  signout: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let navigate = useNavigate();

  let signin = async (newUser: formData) => {
    const response = await api.post("/user/login", newUser);
    const data = response.data;

    localStorage.setItem("x-access-token", data.token);

    return response;
  };

  let signout = () => {
    localStorage.removeItem("x-access-token");

    return navigate("/login");
  };

  let value = { signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Checks if the user has logged in (if they don't have a token)
export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!localStorage.getItem("x-access-token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Checks if the token is expired (used when the user is already logged in)
export function CheckAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (
    location.pathname != "/expiredSession" &&
    localStorage.getItem("x-access-token")
  ) {
    return <Navigate to="/transactions" state={{ from: location }} replace />;
  }

  return children;
}
