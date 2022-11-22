// React stuff
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Request stuff
import api from "../../services/api";

// Components
import ResponseMessage from "../responseMessage";

import blackStar from "../../assets/black-star.svg";

import { UserIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

// History response format
interface IHistoryData {
  date: string;
  id: string;
  type: string;
  username: string;
  value: number;
}

// Filter form format
type filterData = {
  dateFrom: string;
  dateTo: string;
  type: string[];
};

/* HISTORY FUNCTION
-> Returns all of the user transaction history. The user go to /history, select the filter options and the function will fetch the desired data from the API.
*/
export default function History() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<filterData>();

  const [state, setState] = useState<null | "loading" | "success">(null);
  const [history, setHistory] = useState<IHistoryData[] | null>(null);
  let navigate = useNavigate();

  // Animate the title
  useEffect(() => {
    const interval = setInterval(() => {
      let lineElement = document.getElementById("line");

      if (!lineElement!.classList.contains("invisible")) {
        return lineElement!.classList.add("invisible");
      }
      return lineElement!.classList.remove("invisible");
    }, 500);

    return () => clearInterval(interval);
  });

  const onSubmit = async (formData: filterData) => {
    setState("loading");
    setHistory(null);

    const dateFrom = new Date(formData.dateFrom);
    const dateTo = new Date(formData.dateTo);

    if (dateFrom > dateTo) {
      setState(null);
      return setError("dateFrom", {
        type: "custom",
      });
    }

    if (!formData.type || formData.type.length < 1) {
      setState(null);
      return setError("type", {
        type: "custom",
      });
    }

    let path = "/transaction/all";

    if (formData.type.length === 1) {
      path = `/transaction/${formData.type[0]}`;
    }

    try {
      let config = {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      };

      const response = await api.get(path, config);
      const data = response.data;

      if (!data.transactionsDTO) {
        throw new Error();
      }

      const sortedData = data.transactionsDTO.filter((data: any) => {
        if (new Date(data.date) <= dateTo && new Date(data.date) >= dateFrom)
          return data;
      });

      setState(null);
      setHistory(sortedData);
    } catch (e) {
      setState(null);

      return navigate("/error");
    }
  };

  return (
    <>
      {" "}
      <h1 className="font-tech text-[3.5em]">
        {">"} histórico
        <span className="ml-[-0.2em]" id="line">
          _
        </span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[13em] w-[37em] flex-col  justify-between pt-[2em] text-[1.2em] max-[1200px]:w-[100%] md:mt-0"
      >
        <div>
          <div className="flex flex-row  flex-wrap items-center font-bold">
            <label>
              Período:{" "}
              <span
                role="alert"
                className={` text-pink-600  ${
                  errors.dateFrom || errors.dateTo ? "visible" : "invisible"
                }`}
              >
                *
              </span>
            </label>

            <div className="ml-[1em] flex">
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
            </div>
          </div>
          <div className="ml-[5.7em] mt-[5px]  flex w-[17.5em] justify-between">
            <span
              role="alert"
              className={` text-[0.8em] text-pink-600    ${
                errors.dateFrom ? "visible" : "invisible"
              }`}
            >
              * Data inválida.
            </span>

            <span
              role="alert"
              className={`  text-[0.8em] text-pink-600    ${
                errors.dateTo ? "visible" : "invisible"
              }`}
            >
              * Data inválida.
            </span>
          </div>
        </div>
        <div className="mt-[2em]">
          <div className="mt-[-3em] flex ">
            <label
              className="flex
            w-[10em] items-center text-center font-bold"
            >
              Tipo de transação:{"  "}
              <span
                role="alert"
                className={`ml-[0.3em] text-pink-600  ${
                  errors.type ? "visible" : "invisible"
                }`}
              >
                *
              </span>
            </label>
            <div className="ml-[1em] flex w-[6em] items-center justify-evenly">
              <input {...register("type")} type="checkbox" value="cashout" />
              <label>Cashout</label>
            </div>
            <div className="ml-[1em] flex w-[6em] items-center justify-evenly ">
              <input {...register("type")} type="checkbox" value="cashin" />
              <label>Cashin</label>
            </div>
          </div>
          <span
            role="alert"
            className={`mt-[-4em] text-[0.8em] text-pink-600    ${
              errors.type ? "visible" : "invisible"
            }`}
          >
            * Escolha ao menos um tipo.
          </span>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="w-[20em] rounded   bg-black p-[0.8em] text-white hover:bg-[#7431f4] "
          >
            Aplicar filtro
          </button>
          {state === "loading" && (
            <ResponseMessage type="loading" message="Aguarde..." />
          )}
        </div>
      </form>
      <div className="mt-[2em] flex flex-col flex-wrap">
        {history && history.length < 1 && (
          <div className="flex ">
            <img src={blackStar} className=" w-[1.5em]" />
            <h1 className="ml-[0.5em] text-[1.3em]">
              Nenhuma transação nesse período encontrada.
            </h1>
          </div>
        )}{" "}
        {history && history.length > 0 && (
          <div className="flex ">
            <img src={blackStar} className=" w-[1.5em]" />
            <h1 className="ml-[0.5em] text-[1.3em]">
              {history.length}
              {history.length > 1
                ? " transações encontradas"
                : " transação encontrada"}{" "}
              nesse período.
            </h1>
          </div>
        )}{" "}
        {history && history.length > 0 && (
          <div className="mt-[2em] flex flex-wrap justify-evenly">
            {history.map((transaction: IHistoryData) => (
              <div className="mb-[2em] rounded-2xl border-r-[7px] border-b-[7px] border-solid  border-black bg-black">
                <div
                  className="flex h-[11em] flex-col justify-around rounded-2xl border-[1px] border-solid border-black bg-white p-[2em]"
                  key={transaction.id}
                >
                  <div className="font-semibold tracking-widest">
                    {transaction.type === "cashIn" ? "ENTRADA" : "SAÍDA"}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <UserIcon className="w-[1em]" />
                      <span className="ml-[0.3em]">{transaction.username}</span>
                    </div>
                    <div className="flex">
                      <CurrencyDollarIcon className="w-[1em]" />
                      <span className="ml-[0.3em]">{transaction.value}</span>
                    </div>
                    <div className="flex">
                      <CalendarDaysIcon className="w-[1em]" />
                      <span className="ml-[0.3em]">{transaction.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        )}
      </div>
    </>
  );
}
