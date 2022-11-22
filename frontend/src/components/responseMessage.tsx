import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

type MessageProps = {
  type: "loading" | "success";
  message: string;
};

/* MESSAGE FUNCTION
-> It's used by other components. When the data is being fetch, this function is displayed, with a loading icon and message, and also used as a request success message if specified.
*/
export default function ResponseMessage({ type, message }: MessageProps) {
  useEffect(() => {
    const success = document.getElementById("successIcon");
    const loading = document.getElementById("loadingIcon");

    if (type === "loading") {
      success!.classList.add("hidden");
    } else {
      loading!.classList.add("hidden");
    }
  });

  return (
    <div
      className={`flex items-center text-[1.2em] font-light ${
        type === "loading" ? "text-gray-500" : "text-green-500"
      }`}
    >
      <CheckIcon
        id="successIcon"
        className="ml-[2em] w-[1.5em] self-center  "
      />
      <ClockIcon
        id="loadingIcon"
        className="ml-[2em] w-[1.2em] animate-spin self-center  "
      />{" "}
      <h1 className={`ml-[0.5em] `}>{message}</h1>
    </div>
  );
}
