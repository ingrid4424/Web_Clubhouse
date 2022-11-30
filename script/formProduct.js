import {addProduct, uploadPhoto} from "./firebase.js";

const productForm = document.getElementById('productForm');

productForm.addEventListener("submit", async (e)=>{
  e.preventDefault();

  let name = productForm.name.value;
  let details = productForm.details.value;
  let type = productForm.type.value;
  let price = productForm.price.value;
  let review = productForm.review.value;
  let withDiscount = productForm.withDiscount.checked? true : false;
  let discountAverage = productForm.withDiscount.checked? productForm.discount.value : 0;
  let img = productForm.img.files[0]

  if(name === "" || details === "" || type === "" || price === "" || 
      review === "" || withDiscount === "" || discountAverage === ""){
    alert("Un campo esta vacio")
  }else{
    let imgUrl = await uploadPhoto(img, img.name);
   
    console.log(imgUrl)

    let newProduct ={
      name : name,
      details : details,
      type : type,
      price : price,
      review : review,
      withDiscount : withDiscount,
      discountAverage : discountAverage,
      img : imgUrl,
    }
    addProduct(newProduct)
  }
  
});