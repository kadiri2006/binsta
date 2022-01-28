import { set } from "date-fns";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SIGN_UP } from "../constants/routes";

import { useFireBaseContext } from "../context/firebase";
import SignForm from "./Sign-form";

export default function Login() {
  const { firebase, db } = useFireBaseContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/signup");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode);
        setTimeout(() => {
          setEmail((state) => (state = ""));
          setPassword((state) => (state = ""));
        }, 1000);
      });
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div>
      <SignForm
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={(e) => handleSubmit(e)}
        errorMessage={errorMessage}
        email={email}
        password={password}
      />
       <div className="text-center">
        don't have account?
        <NavLink to={SIGN_UP} className="text-center  font-bold text-blue-900">
          {" "}
          SignUp here
        </NavLink>
      </div>
    </div>
  );
}
