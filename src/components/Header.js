import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user";
import useAuthListener from "../hooks/use-auth-listener";
import * as ROUTES from "../constants/routes";
import { useFireBaseContext } from "../context/firebase";

export default function Header() {
  const { user } = useUserContext();
  const { userSignOut } = useFireBaseContext();

  // console.log(`userAuth at header: ${user}`);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src="/images/avatars/ok.webp"
                  alt=""
                  className="h-10 mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>

          <div className="text-gray-700 text-center flex items-center align-items space-x-5">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() =>
                    userSignOut()
                  } /* if we use navigate("/login") its gives some error
                                                      when we signout why? */
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to="/">
                    <img
                      src={`/images/avatars/${user.uid}.jpeg`}
                      alt=""
                      className="rounded-full h-8 w-8 flex"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className=" bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className=" font-bold text-sm rounded text-blue-400 w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
