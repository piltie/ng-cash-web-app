import React from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { formData } from "../components/loginPage";

export function useAuth() {
  return React.useContext(AuthContext);
}

interface AuthContextType {
  signin: (user: formData) => Promise<any>;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let signin = async (newUser: formData) => {
    const response = await api.post("/user/login", newUser);
    const data = response.data;

    localStorage.setItem("x-access-token", data.token);

    return response;
  };

  let signout = (callback: VoidFunction) => {
    localStorage.removeItem("x-access-token");

    callback();
  };

  let value = { signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/*export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  if (!localStorage.getItem("x-access-token")) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome you!{" "}
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
*/
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
    return <Navigate to="/transactions" state={{ from: location }} replace />;
  }

  return children;
}
