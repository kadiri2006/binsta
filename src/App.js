import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { UserContext } from "./context/user";
import IsUserloggedIn from "./helpers/isUserloggedIn";
import ProtectedRoute from "./helpers/protectedRoute";

import useAuthListener from "./hooks/use-auth-listener";
import NotFound from "./pages/not-found";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));

export default function App() {
  let { user } = useAuthListener();

  // console.log(user);

  // console.log(user?.displayName);

  // console.log("userAuth value at app", user);
  //gives user value if user logged in

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <React.Suspense fallback={<>...</>}>
                <IsUserloggedIn>
                  <Login />
                </IsUserloggedIn>
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.SIGN_UP}
            element={
              <React.Suspense fallback={<>...</>}>
                <IsUserloggedIn>
                  <Signup />
                </IsUserloggedIn>
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
