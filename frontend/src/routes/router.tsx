import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/auth/loginPage";
import Transactions from "../components/app/transactions";
import { AuthProvider, RequireAuth, CheckAuth } from "../services/auth";
import AuthLayout from "../pages/authLayout";
import AppLayout from "../pages/appLayout";
import ErrorPage from "../components/auth/error";
import History from "../components/app/history";
import ExpiredToken from "../components/auth/expiredToken";
import Register from "../components/auth/register";
import Success from "../components/auth/successRegister";

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/"
            element={
              <CheckAuth>
                <LoginPage />
              </CheckAuth>
            }
          />
          <Route
            path="/login"
            element={
              <CheckAuth>
                <LoginPage />
              </CheckAuth>
            }
          />

          <Route
            path="/register"
            element={
              <CheckAuth>
                <Register />
              </CheckAuth>
            }
          />
          <Route
            path="/success"
            element={
              <CheckAuth>
                <Success />
              </CheckAuth>
            }
          />
          <Route path="/error" element={<ErrorPage />}></Route>
          <Route path="/expiredToken" element={<ExpiredToken />}></Route>
        </Route>

        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
