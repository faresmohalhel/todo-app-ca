import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqufP67eonMLgKGk-ulte1OJR9vzkjfFE",
  authDomain: "todo-app-ca-fd5fb.firebaseapp.com",
  projectId: "todo-app-ca-fd5fb",
  storageBucket: "todo-app-ca-fd5fb.appspot.com",
  messagingSenderId: "922210775900",
  appId: "1:922210775900:web:87128bd64db9d174f04799",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
