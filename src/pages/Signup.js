import React, { useEffect, useState } from "react";
import { doesUserExist } from "../services/firebase";
import SignupForm from "./Sign-up-form";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit =  (e) => {
    e.preventDefault();
    doesUserExist(userName);
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
      />
    </div>
  );
}
