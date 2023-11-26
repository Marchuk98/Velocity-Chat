import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBo29wvENonp9P5DYjh5jDllu4VbUj9_A",
  appId: "1:527519451668:web:05d60ef349be40035b7501",
  authDomain: "velocity-chat-d38da.firebaseapp.com",
  messagingSenderId: "527519451668",
  projectId: "velocity-chat-d38da",
  storageBucket: "velocity-chat-d38da.appspot.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
