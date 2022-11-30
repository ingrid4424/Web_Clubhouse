import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {auth, getCart} from "../script/firebase.js"

const productsContainer = document.querySelector('.cart__productsContainer');


onAuthStateChanged(auth, async (user) => {
  if (user) {
    displayProducts(user.uid);
  } else {
    // User is signed out
    // ...
  }
});


async function displayProducts(id) {
    let cart = await getCart(id)
    console.log(cart)
    
    /* pintar productos */
    cart.forEach( product => {
        
        const card = document.createElement('div');
        card.classList.add('cart__product');
        card.innerHTML = `
        <img class="cart__product__img" src="${product.img}" alt="productImg.png">
          <div class="cart__product__info">
            <div class="cart__product__infoText">
              <p class="cart__product__name">${product.name}</p>
              <p class="cart__product__name">${product.price}</p>
            </div>

            <div class="cart__product__itemInput">
              <button class="cart__product__minus">-</button>
              <input  class="cart__product__input" type="number">
              <button class="cart__product__plus">+</button>
            </div>
          </div>
        <img src="../../src/img/index/trash_can.svg" alt="trashCan.png">` 


        productsContainer.append(card);
    });

    
}