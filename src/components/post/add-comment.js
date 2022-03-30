import React, { useState } from "react";

import { usePostContext } from "../../context/post";
import { useUserContext } from "../../context/user";

import { likeFunction } from "../../services/firebase";

export default function AddComment({ setEditableComments, inputRef }) {
  const [commentText, setCommentText] = useState("");

  let {
    user: { displayName },
  } = useUserContext();

  const { imgdocId } = usePostContext();

  let submitComment = (e) => {
    e.preventDefault();

    setEditableComments((prevComments) => [
      { displayName, comment: commentText },
      ...prevComments,
    ]);

    likeFunction(imgdocId, { displayName, comment: commentText }, "comment");//add comment to firestore

    setCommentText("");
  };

  return (
    <div className="border-t border-gray-100 ">
      <form
        className="flex justify-between pl-o pr-5"
        onSubmit={(e) => submitComment(e)}
      >
        <input
          type="text"
          className="text-sm text-gray-400 w-full mr-3 py-5 px-4"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          ref={inputRef}
          minLength="4"
          maxLength="50"
          required
        />
        <button
          className={`text-sm font-bold  ${
            commentText.length > 4 ? "text-blue-400" : "text-gray-400"
          }`}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}
