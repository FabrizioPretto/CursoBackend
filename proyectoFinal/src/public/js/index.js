const socketClient = io();




const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');

const products = document.getElementById('products');


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

socketClient.on('arrayProducts', (productsArray) => {

    let infoProducts = '';
    productsArray.forEach(p => {
        infoProducts += `${p.title} - ${p.description} - ${p.code} - $${p.price} - ${p.stock} - ${p.category} </br>`
    });
    products.innerHTML = infoProducts;
    console.log(productsArray);

})

/*
socketClient.on('arrayProducts', async (msg) => {
    console.log(msg);

});*/