import React from "react";
import { useUserContext } from "../context/user";
import useAuthListener from "../hooks/use-auth-listener";

export default function Header() {
  const { user } = useUserContext();
  user.then((x) => console.log(x));

  return <div>Header...</div>;
}
