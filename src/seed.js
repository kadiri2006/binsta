import { collection, addDoc } from "firebase/firestore";
import { db } from "./lib/firebase";

export async function seedDatabase() {
  const users = [
    {
      userId: "KNKsQW7PQGgtKJEbUCtcfMrqKBD2",
      username: "ragu",
      fullName: "ragu nandhan",
      emailAddress: "ragu@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "ramu",
      fullName: "ramu nandhan",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["KNKsQW7PQGgtKJEbUCtcfMrqKBD2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "suresh",
      fullName: "suresh nandhan",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["KNKsQW7PQGgtKJEbUCtcfMrqKBD2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["KNKsQW7PQGgtKJEbUCtcfMrqKBD2"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    await addDoc(collection(db, "users"), users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    await addDoc(collection(db, "photos"), {
      photoId: i,
      userId: "2",
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        {
          displayName: "dali",
          comment: "Love this place, looks like my animal farm!",
        },
        {
          displayName: "orwell",
          comment: "Would you mind if I used this picture?",
        },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: Date.now(),
    });
  }
}
