// React stuff
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Request stuff
import api from "../../services/api";

// Components
import ResponseMessage from "../responseMessage";

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
  });

  const onSubmit = async (formData: filterData) => {
    setState("loading");
    setHistory(null);

    const dateFrom = new Date(formData.dateFrom);
    const dateTo = new Date(formData.dateTo);

    if (dateFrom > dateTo) {
      return setError("dateFrom", {
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

      setState(null);
      setHistory(data.transactionsDTO);
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
            <input
              {...register("type")}
              type="checkbox"
              value="cashout"
              defaultChecked
            />
            <label>Cashout</label>
          </div>
          <div className="ml-[1em] flex w-[6em] items-center justify-evenly ">
            <input
              {...register("type")}
              type="checkbox"
              value="cashin"
              defaultChecked
            />
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
      <div className="flex flex-wrap">
        {" "}
        {history &&
          history.map((transaction: IHistoryData) => (
            <div className="flex flex-col p-[2em]" key={transaction.id}>
              <p>{transaction.type}</p>
              <p>{transaction.username}</p>
              <p>{transaction.value}</p>
              <p>{transaction.date}</p>
            </div>
          ))}
      </div>
    </>
  );
}
