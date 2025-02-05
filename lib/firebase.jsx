import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB9TAdVN2yZQXzFJbDFSdtcy9O_8E3xKr4",
  authDomain: "postit-c43d6.firebaseapp.com",
  projectId: "postit-c43d6",
  storageBucket: "postit-c43d6.firebasestorage.app",
  messagingSenderId: "249702455260",
  appId: "1:249702455260:web:8c095a04975bb861c56119",
  measurementId: "G-R0RTD24MYS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()