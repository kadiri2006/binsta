import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { UserContext } from "./context/user";

import useAuthListener from "./hooks/use-auth-listener";
import NotFound from "./pages/not-found";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));

export default function App() {
  const { user } = useAuthListener();

  // console.log(`userAuth value at app: ${user}`);

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.SIGN_UP}
            element={
              <React.Suspense fallback={<>...</>}>
                <Signup />
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <React.Suspense fallback={<>...</>}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
