// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgFKp9H3bFk2eZaWkUcb-wWAnj4Jkcewo",
  authDomain: "sow-plant.firebaseapp.com",
  databaseURL: "https://sow-plant-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sow-plant",
  storageBucket: "sow-plant.appspot.com",
  messagingSenderId: "303637543662",
  appId: "1:303637543662:web:3dc4311803df3d8c39d1ff",
  measurementId: "G-NJKMVF7J74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
