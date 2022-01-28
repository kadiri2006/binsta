import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LOGIN } from "../constants/routes";
import {
  doesUserExist,
  getAuthUser,
  signUpCredentials,
  storeCredential,
  updateUserProfile,
} from "../services/firebase";
import SignupForm from "./Sign-up-form";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    doesUserExist(userName)
      .then((value) => value.length > 0)
      .then((value) => {
        if (value) {
          console.log("already have this userName");
        } else {
          signUpCredentials(email, password, userName, fullName);

          console.log("create new user with new user name");
        }
      });
  };

  useEffect(() => {
    document.title = "signup";
  }, []);

  return (
    <div>
      <SignupForm
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={(e) => handleSubmit(e)}
        errorMessage={errorMessage}
        email={email}
        password={password}
        setUserName={setUserName}
        userName={userName}
        fullName={fullName}
        setFullName={setFullName}
      />
      <div className="text-center">
        already have account?
        <NavLink to={LOGIN} className="text-center  font-bold text-blue-900">
          {" "}
          click here
        </NavLink>
      </div>
    </div>
  );
}
