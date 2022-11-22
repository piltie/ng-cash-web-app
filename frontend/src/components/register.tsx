// Request and auth stuff
import axios from "axios";
import api from "../services/api";
import { useAuth } from "../services/auth";

// React stuff
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// Icons
import { UserIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

// Components
import ResponseMessage from "../util/responseMessage";
import { useState } from "react";

export type formData = {
  username: string;
  password: string;
};

export default function Register() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<formData>();

  const [state, setState] = useState<null | "loading">(null);

  let navigate = useNavigate();

  const onSubmit = async (formData: formData) => {
    setState("loading");

    if (!/\d/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
      setState(null);
      return setError("password", { type: "custom" });
    }

    try {
      const response = await api.post("/user/create", formData);
      const data = response.data;

      navigate("/success");
    } catch (e) {
      setState(null);

      if (axios.isAxiosError(e)) {
        if (e.response!.status === 400)
          return setError("username", {
            type: "custom",
            message: "* Já existe um usuário com esse nome.",
          });
      }

      return navigate("/error");
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
        <div>
          <h1 className="text-[24px] font-bold">Junte-se a nós!</h1>
          <h2>Confira os requisitos abaixo para criar uma conta NG.CASH:</h2>
          <ul className="mt-[1em]">
            <li>- Usuário: Mínimo de 3 caracteres.</li>
            <li>
              - Senha: Mínimo de 8 caracteres; Ao menos uma letra maíscula e um
              número.
            </li>
          </ul>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[1em] flex h-[15em] flex-col justify-between md:mt-0"
        >
          <label className="font-bold">
            Crie um usuário{" "}
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
              placeholder="Digite o usuário"
              {...register("username", { required: true, minLength: 3 })}
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
            {errors.username?.message
              ? errors.username.message
              : "* Usuário inválido."}
          </span>
          <label className="font-bold">
            Crie uma senha{" "}
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
              className="peer w-[100%] rounded-r-full p-1 outline-none"
              placeholder="Digite a senha"
              {...register("password", { required: true, minLength: 8 })}
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

          <div className="flex">
            <button
              type="submit"
              className="w-[7em] rounded bg-black p-[0.3em] text-white hover:bg-[#7431f4] "
            >
              Cadastrar
            </button>
            {state === "loading" && (
              <ResponseMessage type="loading" message="Aguarde..." />
            )}
          </div>
        </form>
        <Link
          className="group mt-[1em] hover:text-gray-600 md:mt-0  "
          to={`/login`}
        >
          Já possui uma conta?
          <span className="underline underline-offset-4"> Entrar</span>
        </Link>
      </div>
    </>
  );
}
