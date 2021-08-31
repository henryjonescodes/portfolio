// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGH7f1anWDVymTemKoNZaCe1C6bMoNLX8",
  authDomain: "portfolio-e3d67.firebaseapp.com",
  projectId: "portfolio-e3d67",
  storageBucket: "portfolio-e3d67.appspot.com",
  messagingSenderId: "981183313160",
  appId: "1:981183313160:web:db1730392e58716d5828bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFireStore = getFirestore(app);

export {projectFireStore, projectStorage};