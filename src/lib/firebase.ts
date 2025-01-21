import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3Bm32fI-WweZZCoM2gxKZaHpidWFyrGw",
  authDomain: "orbitwayfare.firebaseapp.com",
  databaseURL: "https://orbitwayfare-default-rtdb.firebaseio.com",
  projectId: "orbitwayfare",
  storageBucket: "orbitwayfare.firebasestorage.app",
  messagingSenderId: "895477840259",
  appId: "1:895477840259:web:a2fbd249089603ccb99eb6",
  measurementId: "G-SETXW74VQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };