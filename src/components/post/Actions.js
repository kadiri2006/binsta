import React from "react";
import { useUserContext } from "../../context/user";

export default function Actions() {
  let {
    user: { uid: authId },
  } = useUserContext();

  return <div>Actions</div>;
}
