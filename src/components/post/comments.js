import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePostContext } from "../../context/post";
import AddComment from "./add-comment";
import { formatDistance } from "date-fns";

export default function Comments({inputRef}) {
  let { comments, dateCreated } = usePostContext();

  const [editableComments, setEditableComments] = useState(comments);

  // console.log(editableComments);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {/* <p className="text-sm text-gray-base mb-1 cursor-pointer">
          view all comments
        </p> */}

        {editableComments.slice(0).reverse().map((userComment, index) => (
          <p className="mb-1" key={userComment.displayName + index}>
            <Link to="/">
              <span className="mr-3 font-bold">{userComment.displayName}</span>
            </Link>
            <span>{userComment.comment}</span>
          </p>
        ))}

        <p className="text-gray-base uppercase text-xs">
          {formatDistance(new Date(), dateCreated)} ago
        </p>
      </div>
      <AddComment setEditableComments={setEditableComments} inputRef={inputRef} />
    </>
  );
}
