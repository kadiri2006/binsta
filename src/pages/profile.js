import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Userprofile from "../components/profile";

export default function Profile() {
  let { id } = useParams();

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <Userprofile />
      </div>
    </div>
  );
}
