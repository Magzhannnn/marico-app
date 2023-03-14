import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_AUTH_API,
  authDomain: "marico-f9910.firebaseapp.com",
  projectId: "marico-f9910",
  storageBucket: "marico-f9910.appspot.com",
  messagingSenderId: "1060754475386",
  appId: "1:1060754475386:web:e7f7cfccaec811cc8b2ec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const userFirebase = getFirestore(app);
