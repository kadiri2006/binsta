import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/user";
import { getUserDoc } from "../services/firebase";

export default function useUserInfo() {
  let { user } = useUserContext();
  let [userData, setUserData] = useState(null);

  // console.log(`userAuth value at side bar: ${user}`);

  useEffect(async () => {
    if (user) {
      let [data] = await getUserDoc(user.uid);
      setUserData(data);
    }

    /* return () => {
      setUserData(null);
    }; */
  }, [user]);

  return new Promise((res, rej) => {
    if (userData) {
      res(userData);
    }
  });
}
