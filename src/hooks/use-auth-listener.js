import React, { useEffect, useState } from "react";
import { useFireBaseContext } from "../context/firebase";
import { authUserSaveData } from "../services/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(null);
  const { firebase } = useFireBaseContext();
  // console.log(firebase);
  
  
  useEffect(() => {
    const listener = authUserSaveData(setUser);
    // setUser("ok");
  }, [firebase]);

  return { user };
}

//part-2 for above code

/* export default function useAuthListener() {
  const [user, setUser] = useState(null);
  const { firebase } = useFireBaseContext();
  useEffect(() => {
    async function my() {
      let users = await authUserSaveData();
      return users;
    }

    setUser(my())
  }, [firebase]);
  return { user };
} */
