import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";

export const doesUserExist = (userName) => {
  let userNameList = [];

  try {
    const q = query(collection(db, "users"), where("username", "==", userName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userNameList.push(doc.data().username);
      });

      console.log(userNameList); // first log
    });
  } catch (error) {
    console.log(error);
  }

  console.log(userNameList); //second log
};
