import { ReactNode } from "react";
import {
  Link,
  Navigate,
  Outlet,
  redirect,
  useLocation,
} from "react-router-dom";
import background from "../assets/login_background.png";
import logo from "../assets/logo_ng_cash.gif";
import { AuthStatus } from "../services/auth";

export default function AuthLayout() {
  return (
    <>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <div
        className="flex h-[100vh] items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className=" flex h-[100%] w-[100%] flex-col items-center md:h-[31em] md:w-[30em]">
          <a href="https://ng.cash/">
            <img src={logo} className="w-[8em] md:w-[6em]"></img>
          </a>
          <div className="flex h-[100%] w-[100%]  rounded-none bg-white px-[6em] py-[2em] md:rounded md:px-[2em] ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
