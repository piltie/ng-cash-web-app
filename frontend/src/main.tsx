import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import VerificationLayout from "./routes/verificationRouter";
import AuthLayout from "./pages/authLayout";
import Error from "./components/error";
import Login from "./components/login";
import ExpiredSession from "./components/expiredSession";
import AppLayout from "./pages/appLayout";

const authRoute = createBrowserRouter([
  {
    path: "/",
    element: <VerificationLayout />,
    errorElement: <AuthLayout children={<Error />} />,
    children: [
      {
        path: "login",
        element: <VerificationLayout />,
      },
      {
        path: "expiredSession",
        element: <AuthLayout children={<ExpiredSession />} />,
      },
      {
        path: "transactions",
        element: <AppLayout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={authRoute} />
  </React.StrictMode>
);
