import React from "react";
import { usePostContext } from "../../context/post";

export default function Footer() {
  let { username, caption } = usePostContext();
  

  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  );
}
