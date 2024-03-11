import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEHeIQQ66aUFVcF0oVBH1xsgYCWkEo5ZE",
  authDomain: "itfest-24.firebaseapp.com",
  projectId: "itfest-24",
  storageBucket: "itfest-24.appspot.com",
  messagingSenderId: "834077570912",
  appId: "1:834077570912:web:bc0c44dbc54b5c2c7d5005",
  measurementId: "G-KS14TDTKD3",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage();

export { auth, database, firestore, storage };
