import { ReactNode } from "react";
import background from "../assets/login_background.png";
import logo from "../assets/logo_ng_cash.gif";

interface IAuthLayoutProp {
  children: ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProp) {
  return (
    <div
      className="flex h-[100vh] justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mt-0 flex h-[100%] w-[100%] flex-col items-center md:mt-[4.5em] md:h-[30em] md:w-[30em]">
        <img src={logo} className="w-[8em] md:w-[6em]"></img>
        <div className="h-[100%] w-[100%] rounded-none bg-white p-[2em] md:rounded  ">
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
}
