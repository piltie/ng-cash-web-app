import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="m-auto flex h-[20em] flex-col justify-between text-center">
      <CheckCircleIcon className="w-[5em] self-center text-green-500 " />
      <h1 className=" text-[30px] font-bold">Sucesso!</h1>
      <p>
        Sua conta foi criada com sucesso. Clique no botão abaixo para fazer
        login.
      </p>
      <Link
        to="/login"
        className="m-auto mb-0 mt-[1em] w-[3em] hover:text-[#7431f4]"
      >
        <ArrowRightOnRectangleIcon />
      </Link>
    </div>
  );
}
