// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import {getFirestore, initializeFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgwmbNxFHn2Ya1tK4aojLmp5DFOyqLc-I",
  authDomain: "dbtestresi.firebaseapp.com",
  projectId: "dbtestresi",
  storageBucket: "dbtestresi.appspot.com",
  messagingSenderId: "336163662418",
  appId: "1:336163662418:web:13b2d11ef6c663c2b00d8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
export const storage = getStorage();