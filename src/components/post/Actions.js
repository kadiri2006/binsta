import React, { useState } from "react";
import { useUserContext } from "../../context/user";

import { likeFunction } from "../../services/firebase";

export default function Actions({ photo, inputRef }) {
  let {
    user: { uid: authId },
  } = useUserContext();

  const [like, setLike] = useState(photo.userLikedPhoto);
  const [likeCount, setLikeCount] = useState(photo.likes.length);

  let toggleLikes = () => {
    // console.log(photo);
    if (like) {
      likeFunction(photo.imgdocId, authId, "remove");
      setLikeCount(likeCount - 1);
    } else {
      likeFunction(photo.imgdocId, authId, "add");
      setLikeCount(likeCount + 1);
    }

    setLike(!like);
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
            className={`w-8 mr-4 cursor-pointer focus:outline-none ${
              like && "text-red-500"
            }`}
            onClick={toggleLikes}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            className="w-8 text-black-light cursor-pointer focus:outline-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
            onClick={() => inputRef.current.focus()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">{likeCount}likes</p>
      </div>
    </>
  );
}
