import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import './index.css'

import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
  


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
