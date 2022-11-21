import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect } from "react";

export type formData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<formData>();

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (formData: formData) => {
    try {
      await auth.signin(formData);

      navigate(from, { replace: true });
    } catch (e) {
      //console.clear();
      if (axios.isAxiosError(e)) {
        if (e.response!.status === 400)
          return setError("username", { type: "custom" });
        if (e.response!.status === 401)
          return setError("password", { type: "custom" });
      }

      // TODO: MUDAR PRA PÁGINA DE ERRO
      console.log("erro insesperoooooooooooooooo");
    }
  };

  const passwordToggle = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    const showPassword = document.getElementById("showPassword");
    const hidePassword = document.getElementById("hidePassword");

    if (password.type === "password") {
      password.type = "text";
      showPassword!.classList.add("hidden");
      hidePassword!.classList.remove("hidden");
    } else {
      password!.type = "password";
      hidePassword!.classList.add("hidden");
      showPassword!.classList.remove("hidden");
    }

    password!.focus();
  };

  return (
    <>
      <div className="flex w-[100%] flex-col md:justify-between">
        <h1 className="text-[24px] font-bold">Fazer Login</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[1em] flex h-[15em] flex-col justify-between md:mt-0"
        >
          <label className="font-bold">
            Usuário{" "}
            <span
              role="alert"
              className={` text-pink-600  ${
                errors.username ? "visible" : "invisible"
              }`}
            >
              *
            </span>
          </label>
          <div className="flex flex-row-reverse rounded-full border-[1px] border-solid border-black  outline-2 outline-gray-300 focus-within:outline">
            <input
              className="peer w-[100%] rounded-r-full p-1 outline-none"
              placeholder="Digite seu usuário"
              {...register("username", { required: true })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            <UserIcon className="mx-[0.6em] h-4 w-4 self-center peer-placeholder-shown:text-gray-400 " />
          </div>

          <span
            role="alert"
            className={`mt-[-5px] text-[0.8em] text-pink-600    ${
              errors.username ? "visible" : "invisible"
            }`}
          >
            * Usuário inválido.
          </span>
          <label className="font-bold">
            Senha{" "}
            <span
              role="alert"
              className={` text-pink-600  ${
                errors.password ? "visible" : "invisible"
              }`}
            >
              *
            </span>
          </label>
          <div className="flex flex-row-reverse rounded-full border-[1px] border-solid border-black  outline-2 outline-gray-300 focus-within:outline">
            <input
              type="password"
              id="password"
              className="peer w-[100%] rounded-r-full p-1 outline-none invalid:bg-red-700"
              placeholder="Digite sua senha"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />

            <div
              onClick={passwordToggle}
              className="mx-[0.6em] h-4 w-4 self-center peer-placeholder-shown:text-gray-400 "
            >
              <EyeIcon id="showPassword" />
              <EyeSlashIcon id="hidePassword" className=" hidden " />
            </div>
          </div>

          <span
            role="alert"
            className={`mt-[-5px] text-[0.8em] text-pink-600 ${
              errors.password ? "visible" : "invisible"
            }`}
          >
            * Senha inválida.
          </span>

          <button
            type="submit"
            className="w-[5em] rounded bg-black p-[0.3em] text-white hover:bg-[#7431f4] "
          >
            Entrar
          </button>
        </form>
        <Link
          className="group mt-[1em] hover:text-gray-600 md:mt-0  "
          to={`register`}
        >
          Não tem uma conta?
          <span className="underline underline-offset-4"> Cadastre-se!</span>
        </Link>
      </div>
    </>
  );
}
