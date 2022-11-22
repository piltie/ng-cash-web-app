// Request stuff
import axios from "axios";

// React stuff
import React, { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useOutletContext,
  useNavigate,
} from "react-router-dom";

// Components
import SideBar from "../components/app/sidebar";
import api from "../services/api";
import MobileScreen from "./mobileScreen";

// Assets
import purpleStar from "../assets/purple-star.svg";
import blackStar from "../assets/black-star.svg";

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
    <>
      <MobileScreen />
      <div className="flex  max-[1070px]:text-[0.8em] ">
        <SideBar className="z-10" user={user} />
        <div
          className="z-10 ml-[4em] mr-[4em] max-[1200px]:w-[100%]
        "
        >
          <Outlet context={{ user, setUser }} />
        </div>
      </div>
      <img src={blackStar} className="absolute top-2 right-7 z-10 w-[1.5em]" />
      <img src={purpleStar} className="absolute top-4 right-10 z-10 w-[3em]" />
      <img src={blackStar} className="absolute top-12 right-6 z-10 w-[1.8em]" />
    </>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
