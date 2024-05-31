// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcC-Rv4U4Zvv12n7DQPxYrsi3VWaGlKeo",
  authDomain: "movie-management-58592.firebaseapp.com",
  projectId: "movie-management-58592",
  storageBucket: "movie-management-58592.appspot.com",
  messagingSenderId: "259079307237",
  appId: "1:259079307237:web:bb687ee26523807447390c",
  measurementId: "G-JLY9TJ3GHC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export { storage, googleProvider, auth };
