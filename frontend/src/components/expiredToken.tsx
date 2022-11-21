import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function ExpiredToken() {
  return (
    <div className="m-auto flex h-[15em] flex-col justify-between text-center">
      <ExclamationTriangleIcon className="mx-[0.6em] h-[5em] w-[5em] self-center " />
      <h1 className=" text-[30px] font-bold">Sessão Expirada</h1>
      <p>Sua sessão expirou. Entre novamente.</p>
    </div>
  );
}
