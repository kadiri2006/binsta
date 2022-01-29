import {
  updateProfile,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

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

const signUpCredentials = (email, password, userName, fullName) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      updateUserProfile(userName);
      await createDocument(userCredential, email, userName, fullName);

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

async function createDocument(userCredential, email, userName, fullName) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "users"), {
    userId: userCredential.user.uid,
    username: userName.toLowerCase(),
    fullName,
    emailAddress: email.toLowerCase(),
    following: [],
    followers: [],
    dateCreated: Date.now(),
  });
  console.log("CreateDocument written with ID: ", docRef.id);
}

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

//signed user with save data to local storage
const authUserSaveData =  (setUser) => {
  const auth = getAuth();

   onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // console.log(user.uid);
      // console.log(user.displayName);
      localStorage.setItem("authUser", JSON.stringify(user));
      setUser(user);

      // ...
    } else {
      // User is signed out
      console.log("user signout");
      localStorage.removeItem("authUser");
      setUser(null);
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

export {
  signUpCredentials,
  doesUserExist,
  getAuthUser,
  updateUserProfile,
  authUserSaveData,
};
