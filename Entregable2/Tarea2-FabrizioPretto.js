const fs = require('fs');

class ProductManager {

    constructor() {
        this.events = [];
        this.products = [];
        this.path = './products.json'
    }

    async addProduct(code, title, description, price, stock) {

        const product = {
            code,
            id: this.getMaxId() + 1,
            title,
            description,
            price,
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU",
            stock
        };
        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
        console.log("Se cargó correctamente el producto");
    }

    getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId)
                maxId = product.id;
        })
        return maxId;
    };

    existCode(n) {
        return this.products.some(product => product.code === n);
    }

    async getProducts() {

        try {
            if (fs.existsSync(this.path)) {
                const usersJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(usersJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    /*this.products.map((product) => {
        console.log("Id: " + product.id);
        console.log("Código: " + product.code);
        console.log("Nombre: " + product.title);
        console.log("Descripción: " + product.description);
        console.log("Precio: " + product.price);
        console.log("Stock: " + product.stock);
    })*/


    getProductById(lookForId) {
        //let lookForId = document.getElementById("lookForCode").value;
        if (lookForId <= 0 || lookForId > this.products.length)
            console.log("Id no encontrado");
        else {
            console.log("Id: " + this.products[lookForId - 1].id);
            console.log("Código: " + this.products[lookForId - 1].code);
            console.log("Nombre: " + this.products[lookForId - 1].title);
            console.log("Descripción: " + this.products[lookForId - 1].description);
            console.log("Precio: " + this.products[lookForId - 1].price);
            console.log("Stock: " + this.products[lookForId - 1].stock);
        }
    }
}


function promptUser(message) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Ingrese un valor " + message + ": ", (input) => {
            resolve(input);
            rl.close();
        });
    });
}

const productManager = new ProductManager();
const readline = require('readline');


const menuSelector = async () => {
    let option;
    do {
        console.log("\n\nMenú de Opciones: \n1_ Agregar un nuevo producto\n2_ Ver todos los Productos\n3_ Buscar Producto por código\n4_ Modificar Producto\n5_ Eliminar Producto\n9_ Salir");
        option = parseInt(await promptUser("para el menú de opciones"));

        switch (option) {
            case 1:
                await loadNewProduct();
                break;
            case 2:
                let actualArray = productManager.getProducts();
                if (actualArray.length !== 0) {
                    console.log("El listado de productos es:\n", await productManager.getProducts());
                } else {
                    console.log("\n\nNo existen productos cargados...");
                }
                break;
            case 3:
                let lookForId = parseInt(await promptUser("Id a buscar"));
                productManager.getProductById(lookForId);
                break;
            case 4:
                console.log("Modificar Productos");
                break;
            case 5:
                console.log("Eliminar Productos");
                break;
            case 9:
                console.log("Adiós...");
                break;
            default:
                console.log("Por favor seleccione una opción de las propuestas");
                break;
        }

    } while (option !== 9);
};

const loadNewProduct = async () => {

    let code;
    let title;
    let description;
    let price;
    let stock;

    let codeFlag = false;
    do {
        code = parseInt(await promptUser("mayor a 0 para código\n"));
        codeFlag = productManager.existCode(code);
        if (codeFlag === true)
            console.log("El código ya existe, ingrese uno diferente\n")

    } while (codeFlag === true || code === undefined || code <= 0 || isNaN(code));

    do {
        title = await promptUser("distinto de vacío para nombre\n");
    } while (title === undefined || title === "");

    do {
        description = await promptUser("distinto de vacío para la descripción\n");
    } while (description === undefined || description === "");

    do {
        price = await promptUser("mayor a 0 para el precio\n");
    } while (price === undefined || price <= 0);

    do {
        stock = await promptUser("mayor a 0 para el stock\n");
    } while (stock === undefined || stock <= 0);


    productManager.addProduct(code, title, description, price, stock);
};

menuSelector();