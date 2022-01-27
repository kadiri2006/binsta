import {
  updateProfile,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../lib/firebase";

const doesUserExist = async (userName) => {
  let userNameList = [];

  const q = query(collection(db, "users"), where("username", "==", userName));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.data().username);
    userNameList.push(doc.data().username);
  });

  return userNameList;
};

//AUTHENTICATION-SIGNUP

const signUpCredentials = (email, password, userName) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      updateUserProfile(userName);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
};

//CREATE DOCUMENT

//GET CURRENTLY SIGNED USER

const getAuthUser = () => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user.uid);
      console.log(user.displayName);

      // ...
    } else {
      // User is signed out
      console.log("user signout");
      // ...
    }
  });
};

//UPDATE USER PROFILE

const updateUserProfile = (userName) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: userName,
  })
    .then(() => {
      // Profile updated!
      console.log("profile updated");
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.log(error);
    });
};

export { signUpCredentials, doesUserExist, getAuthUser, updateUserProfile };
