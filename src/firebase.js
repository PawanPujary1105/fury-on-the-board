import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDELMYGpJ9DT89i6oYK_OhvTDeleUDfv6w",
  authDomain: "fury-on-the-board.firebaseapp.com",
  projectId: "fury-on-the-board",
  storageBucket: "fury-on-the-board.firebasestorage.app",
  messagingSenderId: "447778947814",
  appId: "1:447778947814:web:bb9f3f4c5cd9a192393127",
  measurementId: "G-SQXR2CE2NP",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
