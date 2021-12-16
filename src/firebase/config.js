// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQwaxjcRtU60U7Y68n7ifsGvrebcdJTbc",
  authDomain: "zonez-portfolio.firebaseapp.com",
  projectId: "zonez-portfolio",
  storageBucket: "zonez-portfolio.appspot.com",
  messagingSenderId: "471713374612",
  appId: "1:471713374612:web:ef3d4affc93360704caf81",
  measurementId: "G-00QC8Z42E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFireStore = getFirestore(app);

export {projectFireStore, projectStorage};