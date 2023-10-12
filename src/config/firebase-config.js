// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTF4SrAaS5G2QWkCqZFYiHGU3eb0WOtHc",
  authDomain: "my-projects---hosting.firebaseapp.com",
  projectId: "my-projects---hosting",
  storageBucket: "my-projects---hosting.appspot.com",
  messagingSenderId: "224453994302",
  appId: "1:224453994302:web:cd3090bdd9e1e08e88ee6f",
  measurementId: "G-3872BX94BZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
