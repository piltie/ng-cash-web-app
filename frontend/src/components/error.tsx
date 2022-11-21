import { useLocation, useRouteError } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function ErrorPage() {
  return (
    <div className="m-auto flex h-[15em] flex-col justify-between text-center">
      <FaceFrownIcon className="mx-[0.6em] h-[5em] w-[5em] self-center " />
      <h1 className=" text-[30px] font-bold">Opa...</h1>
      <p>
        Aconteceu um erro inesperado. Por favor, tente novamente mais tarde ou
        contate nosso suporte.
      </p>
    </div>
  );
}
