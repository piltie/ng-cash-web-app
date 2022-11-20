import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import VerificationLayout from "./routes/verificationRouter";
import AuthLayout from "./pages/authLayout";
import Error from "./components/error";
import Login from "./components/login";
import ExpiredSession from "./components/expiredSession";

const authRoute = createBrowserRouter([
  {
    path: "/",
    element: <VerificationLayout />,
    errorElement: <AuthLayout children={<Error />} />,
    children: [
      {
        index: true,
        element: <AuthLayout children={<Login />} />,
      },
      {
        path: "login",
        element: <AuthLayout children={<Login />} />,
      },
      {
        path: "expiredSession",
        element: <AuthLayout children={<ExpiredSession />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={authRoute} />
  </React.StrictMode>
);
