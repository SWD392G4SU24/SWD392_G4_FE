// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzI3LoZlUflwspgCLE4PfXAoSPOxSrSKQ",
  authDomain: "jewellry-b517c.firebaseapp.com",
  projectId: "jewellry-b517c",
  storageBucket: "jewellry-b517c.appspot.com",
  messagingSenderId: "678476408918",
  appId: "1:678476408918:web:41f7f03c1609e643ee73f7",
  measurementId: "G-BEYQ6NQ87M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export { app, googleProvider, auth };
