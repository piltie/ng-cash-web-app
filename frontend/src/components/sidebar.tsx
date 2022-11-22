import userpic from "../assets/user-pic.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import logo from "../assets/logo_ng_cash.gif";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function SideBar({ user }: any) {
  const [balance, setBalance] = useState<null | string>(null);
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  const signOut = () => {
    try {
      auth.signout();
    } catch (e) {
      console.clear();

      return navigate("/error");
    }
  };

  const balanceToggle = () => {
    const balanceSpan = document.getElementById("balance") as HTMLElement;
    const showBalance = document.getElementById("showPassword");
    const hideBalance = document.getElementById("hidePassword");

    if (hideBalance!.classList.contains("hidden")) {
      setBalance(balanceSpan!.innerHTML);
      balanceSpan.innerHTML = "*****";
      showBalance!.classList.add("hidden");
      hideBalance!.classList.remove("hidden");
    } else {
      balanceSpan.innerHTML = balance as string;
      showBalance!.classList.remove("hidden");
      hideBalance!.classList.add("hidden");
    }
  };

  return (
    <div className="sticky top-0 flex h-[100vh] w-[25em] flex-col justify-between bg-black text-white">
      <div className="ml-[2em] mt-[2em] flex w-[18em] items-center justify-between">
        <img className="w-[6em]" src={userpic} />
        <div>
          <h1 className="text-[1.7em]">
            Olá, {user ? user.username : "Aguarde..."}
          </h1>
          <div className="flex items-center">
            <div onClick={balanceToggle} className="w-[1em] cursor-pointer">
              <EyeIcon id="showPassword" />
              <EyeSlashIcon id="hidePassword" className=" hidden " />
            </div>
            <h1 className="ml-[0.5em] flex items-center ">
              Saldo: R${" "}
              <span id="balance" className="ml-[0.2em] ">
                {user ? user.balance : "Aguarde..."}{" "}
              </span>{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="mb-[10em] text-[1.5em] ">
        <div
          className={`flex border-y-[2px] border-solid border-white hover:text-[#7431f4] ${
            location.pathname === "/transactions"
              ? "text-[#7431f4]"
              : "text-white"
          }`}
        >
          <Link to="/transactions" className="flex items-center pl-[2em]">
            <BanknotesIcon className=" w-[1em] " />
            <h2 className="py-[1em] pl-[1em]"> Nova Transação</h2>
          </Link>
        </div>
        <div
          className={`border-y-[2px] border-t-0 border-solid border-white hover:text-[#7431f4] ${
            location.pathname === "/history" ? "text-[#7431f4]" : "text-white"
          }`}
        >
          <Link to="/transactions" className="flex items-center pl-[2em]">
            <ClockIcon className=" w-[1em] " />
            <h2 className=" py-[1em] pl-[1em]">Histórico</h2>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div
          onClick={signOut}
          className="ml-[2em] flex w-[4.5em] cursor-pointer items-center justify-between hover:text-[#ff00ff]"
        >
          <ArrowLeftOnRectangleIcon className="  w-[1.5em]" />
          <h2 className="text-[1.3em]">Sair</h2>
        </div>

        <a href="https://ng.cash/">
          <img src={logo} className="mr-[2em] w-[8em] md:w-[6em]"></img>
        </a>
      </div>
    </div>
  );
}
function navigate(arg0: string) {
  throw new Error("Function not implemented.");
}
