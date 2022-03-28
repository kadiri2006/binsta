import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

export default function Suggestions({ userId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    let suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId);
      setProfiles(response);
      // console.log("suggestion", response);
    };
    userId && suggestedProfiles();
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            profile={profile}
            key={profile.docId}
            loggedinUid={userId}
          />
        ))}
      </div>
    </div>
  ) : null;
}
