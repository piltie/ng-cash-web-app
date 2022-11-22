import { UserIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../pages/appLayout";
import api from "../services/api";

type transactionData = {
  username: string;
  balance: number;
};

export default function Transactions() {
  useEffect(() => {
    const interval = setInterval(() => {
      let lineElement = document.getElementById("line");

      if (!lineElement!.classList.contains("invisible")) {
        return lineElement!.classList.add("invisible");
      }
      return lineElement!.classList.remove("invisible");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<transactionData>();
  let navigate = useNavigate();
  const { user } = useUser();

  const onSubmit = async (formData: transactionData) => {
    if (parseFloat(user!.balance) < formData.balance) {
      return setError("balance", {
        type: "custom",
        message: "* Você não possui saldo suficiente.",
      });
    }
    try {
      let config = {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      };

      const response = await api.post("transaction/create", config);
      const data = response.data;
    } catch (e) {
      console.clear();
      if (axios.isAxiosError(e)) {
        if (e.response!.status === 400)
          return setError("username", { type: "custom" });
        if (e.response!.status === 401)
          return setError("balance", {
            type: "custom",
            message: "* Você não possui saldo suficiente.",
          });
      }

      return navigate("/error");
    }
  };

  return (
    <>
      <h1 className="font-tech text-[3.5em]">
        {">"} nova_transação
        <span className="ml-[-0.2em]" id="line">
          _
        </span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[20em] w-[30em]  flex-col justify-between pt-[2em] text-[1.2em] md:mt-0"
      >
        <label className="font-bold">
          Para quem você deseja enviar?{" "}
          <span
            role="alert"
            className={` text-pink-600  ${
              errors.username ? "visible" : "invisible"
            }`}
          >
            *
          </span>
        </label>
        <div className="flex flex-row-reverse  border-b-[1px] border-solid border-black   ">
          <input
            className="peer w-[100%]  p-1 outline-none"
            placeholder="Digite o usuário"
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
          Qual é o valor?{" "}
          <span
            role="alert"
            className={` text-pink-600  ${
              errors.balance ? "visible" : "invisible"
            }`}
          >
            *
          </span>
        </label>
        <div className="flex flex-row-reverse border-b-[1px] border-solid border-black  ">
          <input
            className="peer w-[100%] p-1 outline-none "
            placeholder="Digite o valor"
            {...register("balance", { required: true })}
            aria-invalid={errors.balance ? "true" : "false"}
          />

          <CurrencyDollarIcon className="mx-[0.6em] h-4 w-4 self-center peer-placeholder-shown:text-gray-400 " />
        </div>

        <span
          role="alert"
          className={`mt-[-5px] text-[0.8em] text-pink-600 ${
            errors.balance ? "visible" : "invisible"
          }`}
        >
          {errors.balance?.message
            ? errors.balance.message
            : "* Valor inválido."}
        </span>

        <button
          type="submit"
          className="w-[20em]  rounded bg-black p-[0.3em] text-white hover:bg-[#7431f4] "
        >
          Realizar Transação
        </button>
      </form>
    </>
  );
}
