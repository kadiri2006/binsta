import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useProfileData } from "../../context/profileData";
import { useUserContext } from "../../context/user";
import { toggleFunction } from "../../services/firebase";

export default function Header() {
  let { profile, dispatch } = useProfileData();
  let { user } = useUserContext();
  let [isFollow, setIsFollow] = useState(false);

  // console.log(user);
  //  console.log(profile);

  useEffect(() => {
    // console.log(user);
    if (user?.uid) {
      if (profile.followersCount.includes(user.uid)) setIsFollow(true);
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

  return profile.userName ? (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          className="rounded-full h-40 w-40 flex"
          alt={`full name profile picture`}
          src={`/images/avatars/${profile.userName}.jpeg`}
          /*  onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }} */
        />
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
            <span className="font-bold">{profile.photoCount.length}</span>{" "}
            photos
          </p>
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
    </div>
  ) : (
    <Skeleton count={1} height={150} className="mt-5" />
  );
}
