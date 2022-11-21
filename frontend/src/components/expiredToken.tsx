import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ExpiredToken() {
  return (
    <div className="m-auto flex h-[15em] flex-col justify-between text-center">
      <ExclamationTriangleIcon className="w-[5em] self-center " />
      <h1 className=" text-[30px] font-bold">Sessão Expirada</h1>
      <p>Sua sessão expirou. Clique no botão abaixo e entre novamente.</p>
      <Link
        to="/login"
        className="m-auto  mt-[1em] w-[3em] hover:text-[#7431f4]"
      >
        <ArrowRightOnRectangleIcon />
      </Link>
    </div>
  );
}
