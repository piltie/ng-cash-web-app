import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider, 
} from "react-router-dom";

import './index.css'

import VerificationLayout from "./routes/verificationRouter";
import AuthLayout from "./pages/authLayout";
import ErrorPage from "./error-page";
import Login from './components/login';
import ExpiredSession from './components/expiredSession';
  
const authRoute = createBrowserRouter([
  {
    path: "/",
    element: <VerificationLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthLayout children={ <Login /> } />,
      },
      {
        path: "login",
        element: <AuthLayout children={ <Login /> } />,
      },
      {
        path: "expiredSession",
        element: <AuthLayout children={ <ExpiredSession /> } />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={authRoute} />
  </React.StrictMode>
)
