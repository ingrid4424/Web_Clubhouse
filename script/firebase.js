 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
 import {  getFirestore,
    collection,
    addDoc,
    getDocs,
 } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDTTEAQx3AhUNHryajvt3xXR3NkfV0qMMM",
   authDomain: "final-web-11ec4.firebaseapp.com",
   projectId: "final-web-11ec4",
   storageBucket: "final-web-11ec4.appspot.com",
   messagingSenderId: "265019493489",
   appId: "1:265019493489:web:0b850b8c3980596f77dfd0",
   measurementId: "G-7XTV4SCE30"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const analytics = getAnalytics(app);