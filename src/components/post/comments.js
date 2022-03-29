import React from "react";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments() {
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        <p className="text-sm text-gray-base mb-1 cursor-pointer">
          view all comments
        </p>
        <p className="mb-1">
          <Link to="/">
            <span className="mr-1 font-bold">display name</span>
          </Link>
          <span>comment</span>
        </p>
        <p className="text-gray-base uppercase text-xs">5 days ago</p>
      </div>
      <AddComment />
    </>
  );
}
