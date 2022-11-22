// React stuff
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Assets
import logo from "../../assets/logo_ng_cash.gif";
import userpic from "../../assets/user-pic.png";

// Icons
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  ArrowLeftOnRectangleIcon,
  BanknotesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Request and auth stuff
import { useAuth } from "../../services/auth";
import ResponseMessage from "../responseMessage";

/* HISTORY FUNCTION
-> Returns the black sidebar which appear at the left side when the user successfully authenticates into the app.
*/
export default function SideBar({ user }: any) {
  const [balance, setBalance] = useState<null | string>(null);
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  const signOut = () => {
    try {
      auth.signout();
    } catch (e) {
      return navigate("/error");
    }
  };

  // Hides and shows the users actual balance.
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
    <div className="sticky top-0 flex h-[100vh]  min-w-[25em] flex-col justify-between bg-black text-white">
      <div className="flex flex-col">
        <div className="mt-[2em]  flex items-center justify-center">
          <img className="w-[6em]" src={userpic} />
          {!user ? (
            <div className="mr-[3em]">
              <ResponseMessage type="loading" message="Aguarde..." />
            </div>
          ) : (
            <div className="ml-[2em]">
              <h1 className="text-[1.7em]">Olá, {user.username}</h1>
              <div className="flex items-center">
                <div onClick={balanceToggle} className="w-[1em] cursor-pointer">
                  <EyeIcon id="showPassword" />
                  <EyeSlashIcon id="hidePassword" className=" hidden " />
                </div>
                <h1 className="ml-[0.5em] flex items-center ">
                  Saldo: R${" "}
                  <span id="balance" className="ml-[0.2em] ">
                    {user.balance}
                  </span>{" "}
                </h1>
              </div>
            </div>
          )}
        </div>
        <div className="mt-[3em] text-[1.3em] ">
          <div
            className={`border-y-[0.25px] border-solid border-white hover:text-[#7431f4] ${
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
            className={`border-y-[0.25px] border-t-0 border-solid border-white hover:text-[#7431f4] ${
              location.pathname === "/history" ? "text-[#7431f4]" : "text-white"
            }`}
          >
            <Link to="/history" className="flex items-center pl-[2em]">
              <ClockIcon className=" w-[1em] " />
              <h2 className=" py-[1em] pl-[1em]">Histórico</h2>
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-[1em] flex items-center justify-between">
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
