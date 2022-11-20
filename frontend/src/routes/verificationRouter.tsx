import { Outlet, redirect } from "react-router-dom";

import { Navigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import ExpiredSession from "../components/expiredSession";
import Login from "../components/login";
import AuthLayout from "../pages/authLayout";


export default function VerificationLayout() {
  const [user, setUser]= useState({username: undefined, token: null});

  const loader = async () => {
    if (!user.username) return redirect("/login");
    if (user.token === null) return redirect("/expiredSession");
    
  };
  
  useEffect(()=> {
    loader()
  },[user])
  
  if (!user.username) { return <AuthLayout children={ <Login /> } /> }
  if (user.token === null) { return <AuthLayout children={ <ExpiredSession /> } /> }

  return <Outlet />;

}

/* export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">BOTÃO DE LOGAR??</button>
            </form>
          </div>
          <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>BOTÃO DE CADASTRAR</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }*/