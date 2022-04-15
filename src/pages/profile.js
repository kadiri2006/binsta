import React, { useReducer, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Userprofile from "../components/profile";
import { ProfileData } from "../context/profileData";
import { useUserContext } from "../context/user";
import { doesUserExist, getUserDoc } from "../services/firebase";

export default function Profile() {
  let { id } = useParams();
  let { user } = useUserContext();
  // console.log(user?.displayName);
  let initialState = {
    userName: "",
    fullName: "",
    profileImg: "",
    followersCount: [],
    followingCount: [],
    btn: true,
    profileId: "",
    profileDocId:""
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(sta, dis) {
    return { ...sta, ...dis };
  }

  // console.log(state);

  useEffect(() => {
    getUserDoc(false, id).then((x) => {
      // console.log(x);
      let [{ username, fullName, followers, following, userId ,profileImg,docId}] = x;
      // console.log(username);
      // console.log(userId);

      if (user?.displayName) {
        let btn = !(user.displayName === username);

        dispatch({
          userName: username,
          fullName,
          profileImg,
          followersCount: followers,
          followingCount: following,
          btn,
          profileId: userId,
          profileDocId:docId
        });
      }
    });
  }, [user?.displayName]);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <ProfileData.Provider value={{ profile: state, dispatch }}>
          <Userprofile />
        </ProfileData.Provider>
      </div>
    </div>
  );
}
