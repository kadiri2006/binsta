import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { addToFollowing } from "../../services/firebase";

export default function SuggestedProfile({ profile, loggedinUid }) {
  const [followed, setFollowed] = useState(false);
  const [show, setShow] = useState(true);

  const handleFollowers = async () => {
    setFollowed(true);
    await addToFollowing(profile, loggedinUid);
    setShow(false);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${profile.userId}.webp`}
        />
        <Link to={`/p/${profile.username}`}>
          <p className="font-bold text-sm">{profile.username}</p>
        </Link>
      </div>
      <div>
        <button
          className="text-xs font-bold text-blue-500"
          type="button"
          onClick={handleFollowers}
        >
          Follow
        </button>
      </div>
    </div>
  ) : (
    show && <Skeleton count={1} height={20} className="mt-5" />
  );
}
