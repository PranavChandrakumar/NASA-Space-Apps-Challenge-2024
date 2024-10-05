// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBda_fiFN7wYMM2ll-c5Z2aLiCBm7P5Q_4",
  authDomain: "maplenauts-helios.firebaseapp.com",
  projectId: "maplenauts-helios",
  storageBucket: "maplenauts-helios.appspot.com",
  messagingSenderId: "534462086973",
  appId: "1:534462086973:web:18dd39926e76cdbf3acf54",
  measurementId: "G-161JVQBQGH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, firestore, storage };
