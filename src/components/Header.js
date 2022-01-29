import React from "react";
import { useUserContext } from "../context/user";

export default function Header() {
  const { user } = useUserContext();
  console.log(user);

  return <div>Header...</div>;
}
