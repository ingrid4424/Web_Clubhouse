
displayProducts();

function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    productsInfo.forEach(product => {
        const card = document.createElement('a');
        card.setAttribute('href', `/paginas/producto/?name=${product.name}`)
        card.classList.add('cardProduct');
        card.innerHTML = `<div class="cardProduct-image">
        <img class="cardProduct-inner-image" src="${product.img}">
        </div>
        <div class="cardProduct-content">
        <span class="cardProduct-title">${product.name}</span>
        <p>${product.price}</p>
        <p> 50% off </p>
        <p> en 36x $458 </p>
        </div>` 


        productsContainer.append(card);
    });

    
}