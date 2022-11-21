import { Outlet, redirect } from "react-router-dom";

import { useEffect, useState } from "react";
import ExpiredSession from "../components/expiredSession";
import Login from "../components/login";
import AuthLayout from "../pages/authLayout";

export default function VerificationLayout() {
  const [user, setUser] = useState({ username: "", token: "" });
  const loader = async () => {
    if (user.username === "") {
      console.log("foi nao");
      return <AuthLayout children={<Login teset={socoro} man={user} />} />;
    }
    if (user.token === null) return redirect("/expiredSession");
  };

  const socoro = (data: any) => {
    console.log("vamo lah");
    setUser(data);
  };

  useEffect(() => {
    /*console.log("QUASE LAHHH");
    if (user.username != "") {
      console.log(user);
      console.log("foi??");
      redirect("/transactions");
    }*/
    //loader();
  }, [user]);
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    const userToken = JSON.parse(tokenString!);

    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem("token", JSON.stringify(userToken));

    setToken(userToken.token);
  };
  if (!getToken())
    return (
      <AuthLayout
        children={<Login teset={socoro} man={user} si={saveToken} />}
      />
    );
  if (user.token === null) {
    return <AuthLayout children={<ExpiredSession />} />;
  }
  console.log("xá");

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
