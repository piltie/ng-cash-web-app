import axios from "axios";
import React, { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useOutletContext,
  useNavigate,
  Navigate,
} from "react-router-dom";
import api from "../services/api";

type usee = {
  username: string;
  balance: string;
};

type ContextType = { user: usee | null };

export default function AppLayout() {
  const [user, setUser] = React.useState<usee | null>(null);
  let navigate = useNavigate();
  let location = useLocation();

  const getBalance = async () => {
    try {
      let config = {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      };

      const response = await api.get("/user/info", config);
      const data = response.data;

      if (!data.userDTO) {
        throw new Error();
      }

      setUser(data.userDTO);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response!.status == 401) {
          localStorage.removeItem("x-access-token");
          return navigate("/expiredToken");
        }
      }
      return navigate("/error");
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      INFORMAÇÕES DA SIDEBAR: <hr />
      <Outlet context={{ user }} />
    </>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
