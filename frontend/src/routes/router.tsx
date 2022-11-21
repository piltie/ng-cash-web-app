import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/loginPage";
import Transactions from "../components/transactions";
import { AuthProvider, RequireAuth, CheckAuth } from "../services/auth";
import AuthLayout from "../pages/authLayout";
import AppLayout from "../pages/appLayout";

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
        </Route>

        <Route element={<AppLayout />}>
          <Route
            path="/transactions"
            element={
              <RequireAuth>
                <Transactions />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
