const nameQueryParam = new URLSearchParams(window.location.search).get('name');
let product;

searchProductInfo();

function searchProductInfo(){
    product = productsInfo.find((item) => nameQueryParam === item.name);
    console.log(product);
}

function renderProductInfo(){
    const product_mainImage = document.getElementById('product_mainImage');
    const product_name = document.getElementById('product_name');
    const product_price = document.getElementById('product_price');
    const product_description = document.getElementById('product_description');
    const product_imgs = document.getElementsByClassName('product__carousel');
    const product_value = document.getElementById('product_value');
    product_name.innerText = product.name;
    product_price.innerText = product.price;
    product_description.innerText = product.details;
    product_mainImage.setAttribute('src', product.img );
    product_value.innerText = product.review;

    product_imgs.forEach( (prod) => {
        prod.setAttribute('src', product.img );
    })
}

renderProductInfo();