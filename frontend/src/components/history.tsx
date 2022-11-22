import { UserIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../pages/appLayout";
import api from "../services/api";

interface IHistoryData {
  date: string;
  id: string;
  type: string;
  username: string;
  value: number;
}

type historyFilter = {
  dateFrom: string;
  dateTo: string;
  type: [];
};

export default function History() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<historyFilter>();
  const [cashInHistory, setcashInHistory] = useState<IHistoryData[] | null>(
    null
  );
  const [cashOutHistory, setcashOutHistory] = useState<IHistoryData[] | null>(
    null
  );
  const [bothHistory, setbothHistory] = useState<IHistoryData[] | null>(null);
  let cashOutFilter = true;
  let cashInFilter = true;
  let bothFilter = false;

  const validateData = (startDate: string, endDate: string) => {
    const checkStartDate = new Date(startDate);
    const checkEndDate = new Date(endDate);

    if (checkStartDate > checkEndDate) {
      return setError("dateFrom", {
        type: "custom",
      });
    }

    return true;
  };

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

  let navigate = useNavigate();

  const fetchData = async (type: string, dateFrom: string, dateTo: string) => {
    try {
      let config = {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      };

      const response = await api.get(`/transaction/${type}`, config);
      const data = response.data;

      if (!data.transactionsDTO) {
        throw new Error();
      }
      const starDate = new Date(dateFrom);
      const finishDate = new Date(dateTo);

      function teste(data: any) {
        if (
          new Date(data.date) <= finishDate &&
          new Date(data.date) >= starDate
        )
          return data;
      }
      var ttt = data.transactionsDTO.filter(teste);

      const sortedData = data.transactionsDTO.filter((data: any) => {
        if (
          new Date(data.date) <= finishDate &&
          new Date(data.date) >= starDate
        )
          return data;
      });
      return sortedData;
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

  const getHistory = async (formData: historyFilter) => {
    console.log("ess");
    console.log("uueeeee", formData);
    console.log(formData.type);
    if (!formData.type || formData.type.length < 1) {
      return setError("type", { type: "custom" });
    }
    if (!validateData(formData.dateFrom, formData.dateTo)) {
      return;
    }
    setbothHistory(null);
    setcashInHistory(null);
    setcashOutHistory(null);

    cashInFilter = false;
    cashOutFilter = false;

    let types = formData.type as string[];

    if (formData.type.length > 1) {
      const value1 = await fetchData(
        types[0],
        formData.dateFrom,
        formData.dateTo
      );
      const value2 = await fetchData(
        types[1],
        formData.dateFrom,
        formData.dateTo
      );
      console.log("vamooooo:", value1!.concat(value2!));
      setbothHistory(value1!.concat(value2!));
      console.log(bothHistory);
      bothFilter = true;
      console.log(bothFilter);
    } else {
      const value = await fetchData(
        types[0],
        formData.dateFrom,
        formData.dateTo
      );

      if (types[0] === "cashin") {
        setcashInHistory(value);
        cashInFilter = true;
      } else {
        setcashOutHistory(value);
        cashOutFilter = true;
      }
    }
  };

  useEffect(() => {
    fetchData("cashout", new Date().toISOString(), new Date().toISOString());
    fetchData("cashin", new Date().toISOString(), new Date().toISOString());
  }, []);

  return (
    <>
      {" "}
      <h1 className="font-tech text-[3.5em]">
        {">"} histórico
        <span className="ml-[-0.2em]" id="line">
          _
        </span>
      </h1>
      <div className="flex h-[20em] w-[30em]  flex-col justify-between pt-[2em] text-[1.2em] ">
        <form
          onSubmit={handleSubmit(getHistory)}
          className="flex h-[13em] w-[30em]  flex-col justify-between  "
        >
          <label className="flex flex-row  flex-wrap items-center font-bold">
            <div>
              Período:{" "}
              <span
                role="alert"
                className={` text-pink-600  ${
                  errors.dateFrom || errors.dateTo ? "visible" : "invisible"
                }`}
              >
                *
              </span>
            </div>
            <div className="  border-b-[1px] border-solid border-black   ">
              <input
                className="peer w-[100%]   p-1 outline-none"
                placeholder="Data de início"
                type="date"
                {...register("dateFrom", { required: true })}
                aria-invalid={errors.dateFrom ? "true" : "false"}
              />
            </div>
            <span className="px-[1em]">à</span>
            <div className="  border-b-[1px] border-solid border-black   ">
              <input
                className="peer w-[100%]  p-1 outline-none"
                placeholder="Data de fim"
                type="date"
                {...register("dateTo", { required: true })}
                aria-invalid={errors.dateTo ? "true" : "false"}
              />
            </div>
            <span
              role="alert"
              className={`mt-[-5px] text-[0.8em] text-pink-600    ${
                errors.dateFrom || errors.dateTo ? "visible" : "invisible"
              }`}
            >
              * Data inválida.
            </span>
          </label>

          <div className="flex  ">
            <label
              className="flex
            w-[10em] items-center text-center font-bold"
            >
              Tipo de transação:
            </label>
            <div className="ml-[1em] flex w-[6em] items-center justify-evenly">
              <input {...register("type")} type="checkbox" value="cashout" />
              <label>Cashout</label>
            </div>
            <div className="ml-[1em] flex w-[6em] items-center justify-evenly ">
              <input {...register("type")} type="checkbox" value="cashin" />
              <label>Cashin</label>
            </div>
            <span
              role="alert"
              className={`mt-[-5px] text-[0.8em] text-pink-600    ${
                errors.type ? "visible" : "invisible"
              }`}
            >
              * Escolha ao menos um tipo.
            </span>
          </div>

          <button
            type="submit"
            className="w-[20em]  rounded bg-black p-[0.3em] text-white hover:bg-[#7431f4] "
          >
            Aplicar filtro
          </button>
        </form>
      </div>
      <div className="flex flex-wrap">
        {cashOutFilter && cashOutHistory
          ? cashOutHistory.map((transaction) => (
              <div className="flex flex-col p-[2em]" key={transaction.id}>
                <p>{transaction.type}</p>
                <p>{transaction.username}</p>
                <p>{transaction.value}</p>
                <p>{transaction.date}</p>
              </div>
            ))
          : ""}
        {cashInFilter && cashInHistory
          ? cashInHistory.map((transaction) => (
              <div className="flex flex-col p-[2em]" key={transaction.id}>
                <p>{transaction.type}</p>
                <p>{transaction.username}</p>
                <p>{transaction.value}</p>
                <p>{transaction.date}</p>
              </div>
            ))
          : ""}
        {bothHistory
          ? bothHistory.map((transaction) => (
              <div className="flex flex-col p-[2em]" key={transaction.id}>
                <p>{transaction.type}</p>
                <p>{transaction.username}</p>
                <p>{transaction.value}</p>
                <p>{transaction.date}</p>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
function setError(arg0: string, arg1: { type: string }) {
  throw new Error("Function not implemented.");
}