import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcDQo5h7QJ8kXIgPac3mThk3edxp2XJMY",
  authDomain: "boimixboimix.firebaseapp.com",
  projectId: "boimixboimix",
  storageBucket: "boimixboimix.firebasestorage.app",
  messagingSenderId: "574726991507",
  appId: "1:574726991507:web:1e9dec4d6479969bd96766",
  measurementId: "G-14RVBPPH8L"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
