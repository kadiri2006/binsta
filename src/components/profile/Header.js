import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/routes";
import { useProfileData } from "../../context/profileData";
import { useUserContext } from "../../context/user";
import { toggleFunction, updateProfileImg } from "../../services/firebase";
import Dialog from "./Dialog";

export default function Header() {
  let { profile, dispatch } = useProfileData();
  let { user } = useUserContext();
  let [isFollow, setIsFollow] = useState(false);

  let [dialog, setDialog] = useState({ value: false });
  

  // console.log(user);
  //  console.log(profile);

  useEffect(() => {
    // console.log(user);
    if (user?.uid) {
      if (profile.followersCount.includes(user.uid)) setIsFollow(true);

      // console.log("loginUser id",user.uid,"profileId",profile.profileId);
      // setIsFollow(false);
    }
    // profile.userName
  }, [profile]);
  // console.log(profile);
  let toggleFollow = () => {
    //funcall(toggle,)
    // console.log(profile.profileId);
    // console.log(user.uid);
    if (isFollow) {
      toggleFunction(profile.profileId, user.uid, "remove");
      setIsFollow(!isFollow);
      dispatch({
        ...profile,
        followersCount: profile.followersCount.filter((x) => x !== user.uid),
      });
    } else {
      toggleFunction(profile.profileId, user.uid, "add");
      setIsFollow(!isFollow);
      dispatch({
        ...profile,
        followersCount: profile.followersCount.concat(user.uid),
      });
    }
  };

  let changeImage = (e) => {
    // console.log(e.target.files[0]);
    let imageData = new FormData();
    imageData.append("file", e.target.files[0]);
    imageData.append("upload_preset", "instagram");

    fetch("https://api.cloudinary.com/v1_1/kadiricloud/image/upload", {
      method: "post",
      body: imageData,
    })
      .then((x) => x.json())
      .then((data) => {
        updateProfileImg(profile.profileDocId, data.url);
        dispatch({ ...profile, profileImg: data.url });
      })

      .catch((x) => console.log(x));
  };

  return profile.userName ? (
    <>
      <div
        className={`grid ${
          !profile.btn ? "grid-cols-4" : "grid-cols-3"
        } gap-4 justify-between mx-auto max-w-screen-lg`}
      >
        <div className="container flex justify-center items-center  ">
          <div className="relative group flex justify-center items-center">
            <img
              className={`rounded-full h-40 w-40 flex ${
                !profile.btn && "group-hover:opacity-5"
              }`}
              alt={`full name profile picture`}
              src={profile.profileImg}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
            <label
              htmlFor="image"
              className={`absolute hidden ${
                !profile.btn && "group-hover:block"
              } `}
            >
              <img src="/images/plus.png" />
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className=" hidden"
              onChange={(e) => changeImage(e)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4">{profile.userName}</p>
            {profile.btn && (
              <button
                className=" bg-blue-600 rounded-lg p-2 text-white active:translate-y-px hover:bg-blue-300"
                type="button"
                /* onMouseEnter={() => setIsFollow(!isFollow)}
              onMouseLeave={() => setIsFollow(!isFollow)} */
                onClick={toggleFollow}
              >
                {isFollow ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="container flex mt-4">
            <p className="mr-10">
              <span className="font-bold">{profile.followersCount.length}</span>
              {` `}followers
            </p>
            <p className="mr-10">
              <span className="font-bold">{profile.followingCount.length}</span>{" "}
              following
            </p>
          </div>
          <div className="container mt-4">
            <p className="font-medium">{profile.fullName}</p>
          </div>
        </div>
        {!profile.btn && (
          <div className="upload-post self-center">
            <button
              type="button"
              className=" bg-gray-400 p-4 rounded-md"
              onClick={() => setDialog({ value: true })}
            >
              POST
            </button>
          </div>
        )}
      </div>

      <Dialog dialog={dialog} profileId={profile.profileId}></Dialog>
    </>
  ) : (
    <Skeleton count={1} height={150} className="mt-5" />
  );
}
