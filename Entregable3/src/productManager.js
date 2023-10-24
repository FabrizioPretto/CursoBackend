

const { log } = require('console');
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

    async updateProduct(updateId, field) {

        let actualArray = await this.getProducts();
        let productToUpdate = actualArray.find(product => product.id === updateId);
        let newCode;
        let newTitle;
        let newDescription;
        let newPrice;
        let newStock;

        console.log("El producto a actualizar es: " + JSON.stringify(productToUpdate));

        if (!isNaN(field)) {

            newCode = parseInt(await promptUser("Ingrese mayor a 0 para el nuevo código\n"));
            newTitle = await promptUser("Ingrese distinto de vacío para nombre\n");
            newDescription = await promptUser("Ingrese distinto de vacío para la descripción\n");
            newPrice = parseInt(await promptUser("Ingrese mayor a 0 para el precio\n"));
            newStock = parseInt(await promptUser("Ingrese mayor a 0 para el stock\n"));

            actualArray[updateId - 1].code = newCode;
            actualArray[updateId - 1].title = newTitle;
            actualArray[updateId - 1].description = newDescription;
            actualArray[updateId - 1].price = newPrice;
            actualArray[updateId - 1].stock = newStock;

            try {
                await fs.promises.writeFile(this.path, JSON.stringify(actualArray));
            } catch (error) {
                console.log(error);
            }
        } else {
            switch (field) {
                case "codigo":
                    newCode = parseInt(await promptUser("Ingrese mayor a 0 para el nuevo código\n"));
                    actualArray[updateId - 1].code = newCode;
                    break;
                case "nombre":
                    newTitle = await promptUser("Ingrese distinto de vacío para nombre\n");
                    actualArray[updateId - 1].title = newTitle;
                    break;
                case "descripcion":
                    newDescription = await promptUser("Ingrese distinto de vacío para la descripción\n");
                    actualArray[updateId - 1].description = newDescription;
                    break;
                case "precio":
                    newPrice = parseInt(await promptUser("Ingrese mayor a 0 para el precio\n"));
                    actualArray[updateId - 1].price = newPrice;
                    break;
                case "stock":
                    newStock = parseInt(await promptUser("Ingrese mayor a 0 para el stock\n"));
                    actualArray[updateId - 1].stock = newStock;
                    break;

                default:
                    break;
            }
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(actualArray));
            } catch (error) {
                console.log(error);
            }
        }
        console.log("Producto actualizado correctamente");
        menuSelector();
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

        } catch (error) {
            console.log(error);
        }
        console.log("Producto eliminado correctamente");
    }
}


function promptUser(textString) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(textString, (input) => {
            resolve(input);
            rl.close();
        });
    });
}

const productManager = new ProductManager();
const readline = require('readline');


const menuSelector = async () => {
    let option;

    //do {
    console.log("\n\nMenú de Opciones: \n1_ Agregar un nuevo producto\n2_ Ver todos los Productos\n3_ Buscar Producto por Id\n4_ Modificar Producto\n5_ Eliminar Producto\n9_ Salir");
    option = parseInt(await promptUser(""));

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
            menuSelector();
            break;
        case 3:
            let lookForId = parseInt(await promptUser("Id a buscar"));
            console.log(await productManager.getProductById(lookForId));
            menuSelector();
            break;
        case 4:
            console.log("Ingrese 1 si desea actualizar todos los campos o el nombre del campo (codigo, nombre, descripcion, precio, stock) si es solo alguno en particular: \n")
            let field = await promptUser("")
            let updateId = parseInt(await promptUser("Ingrese el Id del producto a modificar"));
            productManager.updateProduct(updateId, field);
            break;
        case 5:
            let deleteId = parseInt(await promptUser("Id a eliminar"));
            productManager.deleteProduct(deleteId);
            menuSelector();
            break;
        case 9:
            console.log("Adiós...");
            break;
        default:
            console.log("Por favor seleccione una opción de las propuestas");
            await menuSelector();
            break;
    }

    // } while (option !== 9);
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
    console.log("Producto agregado correctamente");
    await menuSelector();
};

menuSelector();



