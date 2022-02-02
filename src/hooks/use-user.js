import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/user";
import { getUserDoc } from "../services/firebase";

export default function useUserInfo() {
  let { user } = useUserContext();
  let [userData, setUserData] = useState(null);

  useEffect(async () => {
    if (user) {
      let [data] = await getUserDoc(user.uid);
      setUserData(data);
    }
  }, [user]);

  return new Promise((res, rej) => {
    if (userData) {
      res(userData);
    }
  });
}