 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
 import {  getFirestore,
    collection, 
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

 import {
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
 
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

 export const auth = getAuth();
 let currentUser = {};

 // dectecta el cambio de usuario
  onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    console.log(uid)

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      currentUser = docSnap.data()
      console.log("Document data:", currentUser);

      //Cambia el texto del botón para indicar al usuario que inicio sesión 
      const loginBtn = document.getElementById('loginBtn'); 
      loginBtn.innerHTML = currentUser.name
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}
    // ...
  } else {
    // User is signed out
    // ...
  }
});


 // se registra el usuario
 export const  register = async(email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // una vez registrado se guarda en la base de datos
    const user = userCredential.user;
    console.log(user);

    //guarda en la base de datos "users"
    try {
      const docRef = await doc(collection(db, "users"), user.uid);
      await setDoc(docRef,{
        id: docRef.id,
        name: name,
        email: email,
        admin: false
      }).then (() =>{
          //envia a la tienda luego de guardarlo
          location.href = "/paginas/tienda/tienda.html"
      })
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
 }

 // hace login el usuario
 export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // lo envia a la tienda
    location.href = "/paginas/tienda/tienda.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
 }

 export const addToCart = async (product)=>{
  try {
    const docRef = await doc(collection(db, `users/${currentUser.id}/cart`));
    await setDoc(docRef,product).then (() =>{
        //envia a la tienda luego de guardarlo
        location.href = "/paginas/tienda/tienda.html"
    })
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
 }

export const getCart = async (id)=>{
  let cart=[];

  console.log(id);
  const querySnapshot = await getDocs(collection(db, `users/${id}/cart`));

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    
    cart.push(doc.data());
  });

  return cart;

}


 
