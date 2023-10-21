import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAEolWrJ1HLeL80mD_1-bRIdkv1uKk-9b0",
  authDomain: "rookas-quick-feedback.firebaseapp.com",
  projectId: "rookas-quick-feedback",
  storageBucket: "rookas-quick-feedback.appspot.com",
  messagingSenderId: "676110362122",
  appId: "1:676110362122:web:d1a3a9346c38a86e61a1f3",
  measurementId: "G-QEXM9WRB27"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export {
  db,
  auth,
  functions,
}
