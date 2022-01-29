import React, { useEffect, useState } from "react";
import { useFireBaseContext } from "../context/firebase";
import { authUserSaveData } from "../services/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(null);
  const { firebase } = useFireBaseContext();
  useEffect(() => {
    // const listener = authUserSaveData(setUser);
    setUser("ok..");

    return () => {
      // listener();
    };
  }, [firebase]);

  return { user };
}
