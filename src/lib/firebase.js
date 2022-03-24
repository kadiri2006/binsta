import { initializeApp } from "firebase/app";
import { seedDatabase } from "../seed";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCJ8oj3GjUEfRb4ik1bQDn3olj6_0qoVcM",

  authDomain: "binsta-8ed7d.firebaseapp.com",

  projectId: "binsta-8ed7d",

  storageBucket: "binsta-8ed7d.appspot.com",

  messagingSenderId: "1064409815567",

  appId: "1:1064409815567:web:05d5d891dd86678a8a217a",
};

const firebase = initializeApp(config);

const db = getFirestore();

// seedDatabase();

export { firebase, db };
