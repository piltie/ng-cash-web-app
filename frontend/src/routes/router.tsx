import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/loginPage";
import Transactions from "../components/transactions";
import { AuthProvider, RequireAuth, CheckAuth } from "../services/auth";
import AuthLayout from "../pages/authLayout";
import AppLayout from "../pages/appLayout";
import ErrorPage from "../components/error";
import ExpiredToken from "../components/expiredToken";

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
        </Route>
      </Routes>
    </AuthProvider>
  );
}
