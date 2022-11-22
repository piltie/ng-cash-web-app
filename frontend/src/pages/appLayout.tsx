import axios from "axios";
import React, { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useOutletContext,
  useNavigate,
  Navigate,
} from "react-router-dom";
import SideBar from "../components/sidebar";
import api from "../services/api";

type IUserData = {
  username: string;
  balance: string;
};

type ContextType = {
  user: IUserData | null;
  setUser: React.Dispatch<React.SetStateAction<IUserData | null>>;
};

export default function AppLayout() {
  const [user, setUser] = React.useState<IUserData | null>(null);
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
    <div className="flex">
      <SideBar className="z-10" user={user} />
      <div className="z-10 ml-[2em]">
        <Outlet context={{ user, setUser }} />
      </div>
    </div>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
