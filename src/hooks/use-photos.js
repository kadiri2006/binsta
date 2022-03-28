import React, { useEffect, useState } from "react";

import { useUserContext } from "../context/user";
import { getPhotos, getUserDoc } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  let { user } = useUserContext();

  useEffect(() => {
    if (user) {
      async function fetchPhotos() {
        const [{ following }] = await getUserDoc(user.uid);
        // console.log(following);

        let iFollowedPhotos = [];

        if (following.length > 0) {
          iFollowedPhotos = await getPhotos(user.uid, following);
          // console.log(iFollowedPhotos);
          setPhotos(iFollowedPhotos);
        } else {
          setPhotos([]);
        }
      }
      fetchPhotos();
    }
  }, [user]);

  return { photos };
}
