import {getProducts} from "../script/firebase.js"

const productsContainer = document.getElementById('products-container');

let products = await getProducts()
console.log(products)

displayProducts(products);

async function displayProducts(infoProducts = []) {
    /* pintar productos */
    products.forEach(product => {
        const card = document.createElement('a');
        card.setAttribute('href', `/paginas/producto/?name=${product.name}`)
        card.classList.add('cardProduct');
        card.innerHTML = `<div class="cardProduct-image">
        <img class="cardProduct-inner-image" src="${product.img}">
        </div>
        <div class="cardProduct-content">
        <span class="cardProduct-title">${product.name}</span>
        <p class="cardProduct-price">$ ${product.price}</p>
        <div class="cardProduct-discount" ${product.withDiscount? `data-discount="true"`: `data-discount="false"`} > ${ product.withDiscount? product.discountAverage: ""} </div>
        
        </div>` 


        productsContainer.append(card);
    });

    
}

////////// función de filtro

function filterBy(products = [],filterType = "",filterValue = ""){
    productsContainer.innerHTML = "";
    if(filterType === "all"){
        displayProducts(products);
    } else {
        
        let productsFilter = products.filter(product => product[filterType] === filterValue);
        displayProducts(productsFilter);
    }

}

//////////// función de orden

function orderByPrice( products = [],orderType = "") {
    productsContainer.innerHTML = "";

    let productsOrder = orderType === "high"? products.sort((a,b) => b.price - a.price): products.sort((a,b) => a.price - b.price)
    displayProducts(productsOrder);
}

// se añadio el metodo para filtrar por nombre
function orderByName( products = [],orderType = "") {
    console.log(orderType);
    productsContainer.innerHTML = "";
    

    let productsOrder = orderType === "AZ"? products.sort((a,b) => { 
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        }): 
        products.sort((a,b) => {
            if(a.name < b.name) { return 1; }
            if(a.name > b.name) { return -1; }
            return 0;
        })
        
    displayProducts(productsOrder);
}

///////////////////filtros

const filterByAll = document.getElementById('byAll');
const filterByDiscount = document.getElementById('byDiscount');
const filterByShirt = document.getElementById('byShirt');
const filterByCap = document.getElementById('byCap');

//////////////// llamar filtros

filterByAll.addEventListener('click', (e) =>{
    filterBy(products,"all", "");
});

filterByDiscount.addEventListener('click', (e) =>{
    filterBy(products,"withDiscount", true);
});

filterByShirt.addEventListener('click', (e) =>{
    filterBy(products,"type", "shirt");
});

filterByCap.addEventListener('click', (e) =>{
    filterBy(products,"type", "cap");
});

////////////////////// ordern
const byPrice = document.getElementById('byPrice');

byPrice.addEventListener('change', (e) =>{
    orderByPrice(products, e.target.value);
})

// se usa el metodo de filtrar por nombre con el selector añadido
const byName = document.getElementById('byName');

byName.addEventListener('change', (e) =>{
    orderByName(products, e.target.value);
})