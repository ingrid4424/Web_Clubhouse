import {register,login} from "../script/firebase.js"

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    let email = loginForm.email.value;
    let password = loginForm.password.value;

    if(email === "" || password === ""){
      alert("los campos estan vacios")
    }else{
      login(email, password)
    }
    
});

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener("submit", (e)=>{
  e.preventDefault();

  let email = registerForm.email.value;
  let password = registerForm.password.value;
  let cpassword = registerForm.cpassword.value;
  let names = registerForm.names.value;
  let secondNames = registerForm.secondNames.value;

  console.log(registerForm.password, )

  if(email === "" || password === "" || cpassword === "" || names === "" || secondNames === ""){
    alert("Un campo esta vacio")
  }else if(password!=cpassword){
    alert("las contraseñas no coinciden")
  }else{
    register(email, password, names+" "+secondNames)
  }
  
});
