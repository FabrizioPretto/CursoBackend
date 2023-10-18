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
            id: await this.getMaxId() + 1,
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

    async getMaxId() {
        try {
            const products = await this.getProducts();
            const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
            return maxId;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

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

    async getProductById(lookForId) {

        let actualArray = await this.getProducts()

        if (lookForId <= 0 || lookForId > actualArray.length)
            return console.log("Id no encontrado");
        else {
            return JSON.stringify(actualArray[lookForId - 1])
        }
    }

    async updateProduct(updateId, updatefield) {
        let actualArray = await this.getProducts();
        let productToUpdate = actualArray.find(product => product.id === updateId);

    }

    async deleteProduct(deleteId) {
        let actualArray = await this.getProducts();
        if (actualArray.length === 0) {
            console.log("Aún no existen productos cargados");
            return;
        }

        let position = actualArray.findIndex(product => product.id === deleteId);
        if (position === -1) {
            console.log("Producto no encontrado con el Id ingresado");
            return;
        }

        actualArray.splice(position, 1);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(actualArray));
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.log(error);
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
                console.log(await productManager.getProductById(lookForId));
                break;
            case 4:
                let updateId = parseInt(await promptUser("Id de producto a modificar"));
                let updatefield = await promptUser("Campo de producto a modificar");
                productManager.updateProduct(updateId, updatefield);
                break;
            case 5:
                let deleteId = parseInt(await promptUser("Id a eliminar"));
                productManager.deleteProduct(deleteId);
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