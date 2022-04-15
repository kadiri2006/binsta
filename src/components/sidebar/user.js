import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/routes";

export default function User({ fullName, username,userId,profileImg }) {
  return (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          src={profileImg}
          alt={JSON.parse(localStorage.getItem("url"))}
          className="rounded-full w-16 flex mr-3"
          onError={(e)=>e.target.src=DEFAULT_IMAGE_PATH}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
}
