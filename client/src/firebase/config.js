import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCvWCzwJvXqg4ODoVSZpwFX0zqRe5-0SKI",
  authDomain: "heritage-881c4.firebaseapp.com",
  projectId: "heritage-881c4",
  storageBucket: "heritage-881c4.appspot.com",
  messagingSenderId: "326193913583",
  appId: "1:326193913583:web:ccfa14050f0b44935c851a"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = firebase.database();
