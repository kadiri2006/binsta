import React from "react";

export default function Header() {
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          className="rounded-full h-40 w-40 flex"
          alt={`full name profile picture`}
          src={`/images/avatars/4.webp`}
         /*  onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }} */
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">profileusername</p>
          <button
            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
            type="button"
          >
            follow
          </button>
        </div>
        <div className="container flex mt-4">
          <p className="mr-10">
            <span className="font-bold">photosCount</span> photos
          </p>
          <p className="mr-10">
            <span className="font-bold">followers count</span>
            {` `}1 follower
          </p>
          <p className="mr-10">
            <span className="font-bold">5</span> following
          </p>
        </div>
        <div className="container mt-4">
          <p className="font-medium">fullname</p>
        </div>
      </div>
    </div>
  );
}
