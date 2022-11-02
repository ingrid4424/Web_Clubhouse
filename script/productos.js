const productsContainer = document.getElementById('products-container');

displayProducts(productsInfo);

function displayProducts(infoProducts = []) {
    /* pintar productos */
    infoProducts.forEach(product => {
        const card = document.createElement('a');
        card.setAttribute('href', `/paginas/producto/?name=${product.name}`)
        card.classList.add('cardProduct');
        card.innerHTML = `<div class="cardProduct-image">
        <img class="cardProduct-inner-image" src="${product.img}">
        </div>
        <div class="cardProduct-content">
        <span class="cardProduct-title">${product.name}</span>
        <p class="cardProduct-price">${product.price}</p>
        <div class="cardProduct-discount" ${product.withDiscount? `data-discount="true"`: `data-discount="false"`} > ${ product.withDiscount? product.discountAverage: ""} </div>
        
        </div>` 


        productsContainer.append(card);
    });

    
}

////////// función de filtro

function filterBy(products = [],filterType = "",filterValue = ""){
    productsContainer.innerHTML = "";
    if(filterType === "all"){
        displayProducts(productsInfo);
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

///////////////////filtros

const filterByAll = document.getElementById('byAll');
const filterByDiscount = document.getElementById('byDiscount');
const filterByShirt = document.getElementById('byShirt');
const filterByCap = document.getElementById('byCap');

//////////////// llamar filtros

filterByAll.addEventListener('click', (e) =>{
    filterBy(productsInfo,"all", "");
});

filterByDiscount.addEventListener('click', (e) =>{
    filterBy(productsInfo,"withDiscount", true);
});

filterByShirt.addEventListener('click', (e) =>{
    filterBy(productsInfo,"type", "shirt");
});

filterByCap.addEventListener('click', (e) =>{
    filterBy(productsInfo,"type", "cap");
});

////////////////////// ordern
const byPrice = document.getElementById('byPrice');

byPrice.addEventListener('change', (e) =>{
    orderByPrice(productsInfo, e.target.value);
})
