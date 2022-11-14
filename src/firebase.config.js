import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC0sWOPtBUU-MO7frmf4tfzBvtwG8Msra0",
    authDomain: "foodaffairs-b330b.firebaseapp.com",
    databaseURL: "https://foodaffairs-b330b-default-rtdb.firebaseio.com",
    projectId: "foodaffairs-b330b",
    storageBucket: "foodaffairs-b330b.appspot.com",
    messagingSenderId: "593821604728",
    appId: "1:593821604728:web:bf87c7a7be335fdee1068d"
  };


  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app, firestore, storage}