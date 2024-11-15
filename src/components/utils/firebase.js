// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXMaVg_X0U0XI5N0RG75f0Opz9PBH52BY",
  authDomain: "food-delivery-app-7c4ce.firebaseapp.com",
  projectId: "food-delivery-app-7c4ce",
  storageBucket: "food-delivery-app-7c4ce.appspot.com",
  messagingSenderId: "571198655508",
  appId: "1:571198655508:web:1233604881e1e45276eb01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth();