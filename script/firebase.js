 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
 import {  getFirestore,
    collection, 
    doc,
    where,
    query,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

 import {
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import { getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
 
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
 const storage = getStorage(app);
 export const auth = getAuth();
 
 let currentUser = {};

 // dectecta el cambio de usuario
  onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      currentUser = docSnap.data()
      console.log("Document data:", currentUser);

      //Cambia el texto del botón para indicar al usuario que inicio sesión 
      const loginBtn = document.getElementById('loginBtn'); 

      console.log(location.pathname)
      
      if(currentUser.admin && loginBtn !== null){
        if(location.pathname == "/paginas/Form/form.html"){

          loginBtn.innerHTML = "cerrar sesión"
          loginBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            signOut(auth).then(() => {
              // Sign-out successful.
              location.href = "/paginas/tienda/tienda.html"
            })
          })

        }else{
          loginBtn.innerHTML = currentUser.name
          loginBtn.setAttribute("href","/paginas/Form/form.html")
        }
      }else if (loginBtn !== null){
        if(location.pathname == "/paginas/Login/login.html"){
          loginBtn.innerHTML = "cerrar sesión"
          loginBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            signOut(auth).then(() => {
              // Sign-out successful.
              location.href = "/paginas/tienda/tienda.html"
            })
          })
        }else{
          loginBtn.innerHTML = currentUser.name
        }
      }

    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}
    // ...
  } else {
    switch (location.pathname) {
      case "/paginas/Form/form.html":
        location.href = "/paginas/tienda/tienda.html"
        break;

      case "/paginas/cart/cart.html":
        location.href = "/paginas/Login/login.html"
      break;
    
      default:
        break;
    }
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

 //añade el producto al carrito
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

// llama el carrito del usuario
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

// añade el producto a la base de datos
export const addProduct = async(newProduct)=>{
  try {
    const docRef = await doc(collection(db, `products`));
    await setDoc(docRef,newProduct).then (() =>{
        //envia a la tienda luego de guardarlo
        location.href = "/paginas/tienda/tienda.html"
    })
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Sube la foto a la base de datos
export  const uploadPhoto = async (file, filename) =>{
  const storageRef = ref(storage, `product/${filename}`);
  let imgUrl = "test";

  await uploadBytes(storageRef, file).then(async (snapshot) => {
    await getDownloadURL(storageRef)
      .then((url) => {

    // Or inserted into an <img> element
      imgUrl = url;
    })
    .catch((error) => {
    // Handle any errors
    });
  });

  return imgUrl;
}

// llama los productos de la pagina
export const getProducts = async ()=>{
  let products=[];
  const querySnapshot = await getDocs(collection(db, `products`));

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    
    products.push(doc.data());
  });

  return products;
}

export const getProduct = async (name)=>{
  let product={};
  console.log(name);

  const q = query(collection(db, "products"), where("name", "==", name));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    product = doc.data();
  });

  console.log(product);
  return product;

}

const cartBtn = document.querySelector(".store__options__cart");

if(cartBtn !== null){
  cartBtn.addEventListener("click",(e)=>{
    location.href= "/paginas/cart/cart.html"
  })
}

