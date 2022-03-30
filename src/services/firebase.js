import {
  updateProfile,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  limit,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db } from "../lib/firebase";

//check field in document using userName

const doesUserExist = async (userName) => {
  let userNameList = [];

  const q = query(collection(db, "users"), where("username", "==", userName));
  // console.log(q);

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data().username);
      userNameList.push(doc.data().username);
    });
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }

  return userNameList;
};
//check field in document using userId

const getUserDoc = async (userId) => {
  let userNameList = [];

  const q = query(collection(db, "users"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const updatedData = {
      ...doc.data(),
      docId: doc.id,
    };
    userNameList.push(updatedData);
  });

  return userNameList;
};

//AUTHENTICATION-SIGNUP

const signUpCredentials = (email, password, userName, fullName) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // console.log(`user credential after sign up`, userCredential);
      updateUserProfile(userName);
      createDocument(userCredential, email, userName, fullName);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`sign-up error code ${errorCode}`);
      console.log(`sign-up error message ${errorMessage}`);
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

//save data to local storage when user sign-in

const authUserSaveData = (setUser) => {
  const auth = getAuth();
  // console.log("app->useAuthListener->authUserSaveData");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(`userAuth signed in from -->app--->useauthlistener`, user);

      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // console.log(user.uid);
      // console.log(user.displayName);
      localStorage.setItem("authUser", JSON.stringify(user));
      setUser(user);
      // console.log("userAuth data saved in local storage");

      // ...
    } else {
      // User is signed out
      // console.log("user not signed in");
      localStorage.removeItem("authUser");
      setUser(null);

      // ...
    }
  });
};

//part-2 for above code

/* const authUserSaveData = (setUser) => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // console.log(user.uid);
        // console.log(user.displayName);
        console.log("user signed in");
        localStorage.setItem("authUser", JSON.stringify(user));
        resolve(user);

        // ...
      } else {
        // User is signed out
        console.log("user signout");
        localStorage.removeItem("authUser");

        reject("User not found");
        // ...
      }
    });
  });
}; */

//UPDATE USER PROFILE

const updateUserProfile = (userName) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: userName,
  })
    .then(() => {
      // Profile updated!
      console.log(`auth profile updated with displayName : ${userName}`);
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.log(error);
    });
};

//signOut user
const userSignOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("signout successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

//get All documents

const getSuggestedProfiles = async (userId) => {
  const q = query(
    collection(db, "users"),
    where("userId", "!=", userId),
    limit(10)
  );

  const querySnapshot = await getDocs(q);
  let completeData = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (!doc.data().followers.includes(userId)) {
      let data = {
        ...doc.data(),
        docId: doc.id,
      };
      completeData.push(data);
    }
  });

  return completeData;
};

// ADD USER TO FOLLOWING LIST
const addToFollowing = async (profile, loggedinUid) => {
  let response = await getUserDoc(loggedinUid);

  const loggedinRef = doc(db, "users", response[0].docId);

  // Atomically add a new region to the "regions" array field.
  await updateDoc(loggedinRef, {
    following: arrayUnion(profile.userId),
  });

  const requestedRef = doc(db, "users", profile.docId);
  await updateDoc(requestedRef, {
    followers: arrayUnion(loggedinUid),
  });

  // Atomically remove a region from the "regions" array field.
  /* await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast"),
  }); */
};

let getPhotos = async (id, following) => {
  let userNameList = [];

  for (let i = 0; i < following.length; i++) {
    const q = query(
      collection(db, "photos"),
      where("userId", "==", following[i])
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const updatedData = {
        ...doc.data(),
        imgdocId: doc.id,
      };
      userNameList.push(updatedData);
    });
  }

  // console.log(userNameList);

  /* let dummy = userNameList.map(async (photo) => {
    let userLikedPhoto = false;
    if (photo.likes.includes(id)) {
      userLikedPhoto = true;
    }

    const user = await getUserDoc(photo.userId);

    console.log(user);

    const { username } = user[0];
    return { username, ...photo, userLikedPhoto };
  });

  console.log(dummy); */

  const photosWithUserDetails = await Promise.all(
    userNameList.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(id)) {
        userLikedPhoto = true;
      }

      const user = await getUserDoc(photo.userId);

      // console.log(user);

      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  // console.log(`photowithuserdetails`, photosWithUserDetails);
  return photosWithUserDetails;
};

//update document field

let likeFunction = async (imgdocId, authId, toggle) => {
  const likeRef = doc(db, "photos", imgdocId);

  // Atomically add a new region to the "regions" array field.
  if (toggle === "add") {
    await updateDoc(likeRef, {
      likes: arrayUnion(authId),
    });
  } else {
    // Atomically remove a region from the "regions" array field.
    await updateDoc(likeRef, {
      likes: arrayRemove(authId),
    });
  }

  if (toggle === "comment") {
    await updateDoc(likeRef, {
      comments: arrayUnion(authId),
    });
  }
};

export {
  signUpCredentials,
  doesUserExist,
  getAuthUser,
  updateUserProfile,
  authUserSaveData,
  userSignOut,
  getUserDoc,
  getSuggestedProfiles,
  addToFollowing,
  getPhotos,
  likeFunction,
};
