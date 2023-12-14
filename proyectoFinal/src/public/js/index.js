const socketClient = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');

const products = document.getElementById('products');
const inputLogout = document.getElementById('logout')

inputLogout.onclick = () => {
    render('login');
}

async function logout() {
    res.render('login');
}


form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const code = inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;

    const product = { title, description, code, price, stock, category }
    socketClient.emit('newProduct', product);
    clean();

}

function clean() {
    inputTitle.value = '';
    inputDescription.value = '';
    inputCode.value = '';
    inputPrice.value = '';
    inputStock.value = '';
    inputCategory.value = '';
}

socketClient.on('arrayProducts', async (productsArray) => {

    let infoProducts = '';
    productsArray.forEach(p => {
        infoProducts += `${p.title} - ${p.description} - ${p.code} - $${p.price} - ${p.stock} - ${p.category} </br>`
    });
    products.innerHTML = infoProducts;
    console.log(productsArray);
    let productsList = document.getElementById('productsList');
    let lastProduct = productsList[productsList.lenght]
    productsList.append(`<li>
            <div class="col">
            <div class="card" style="width: 12em;" style="height:12em; border-radius:2px" >
            <img src="${lastProduct.thumbnail}" style="height: 50px; width: 50px; text-decoration: none;" class="card-img-top" alt="${lastProduct.title}">
            <div class="card-body">
            <h5 class="card-title">Producto: ${lastProduct.title}</h5>
            <p class="card-text">Descripción: ${lastProduct.description}</p>
            <p class="card-text">Código: ${lastProduct.code}</p>
            <p class="card-text">Precio: $${lastProduct.price}</p>
            <p class="card-text">Stock: ${lastProduct.stock}</p>
            <p class="card-text">Categoría: ${lastProduct.category}</p>
            </div>
            </div>
            </div>
        </li></br>`)
})

/*
socketClient.on('arrayProducts', async (msg) => {
    console.log(msg);

});*/