import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useUserInfo from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

export default function Sidebar() {
  const [signInUserData, setSignInUserData] = useState({});

  useUserInfo().then((data) => setSignInUserData(data));

  // console.log(signInUserData);

  return (
    <>
      {Object.keys(signInUserData).length > 0 ? (
        <div className="p-4">
          <User
            username={signInUserData.username}
            fullName={signInUserData.fullName}
            userId={signInUserData.userId}
            profileImg={signInUserData.profileImg}
          />
          <Suggestions userId={signInUserData.userId} />
        </div>
      ) : (
        <Skeleton count={1} height={61} />
      )}
    </>
  );
}
