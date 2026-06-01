import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAwH1QHRkp4o_bUX_UArL1UlZSgxuFnJA",
  authDomain: "jewellkash-9da88.firebaseapp.com",
  projectId: "jewellkash-9da88",
  storageBucket: "jewellkash-9da88.firebasestorage.app",
  messagingSenderId: "579010221541",
  appId: "1:579010221541:web:e6b75daf056be963d44b0c",
  measurementId: "G-TSSRPST499"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);