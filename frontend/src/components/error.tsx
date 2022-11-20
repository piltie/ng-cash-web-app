import { useRouteError } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="m-auto flex h-[15em] flex-col justify-between text-center">
      <FaceFrownIcon className="mx-[0.6em] h-[5em] w-[5em] self-center " />
      <h1 className=" text-[30px] font-bold">Opa...</h1>
      <p>
        Aconteceu um errado inesperado. Por favor, tente novamente mais tarde ou
        contate nosso suporte.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
