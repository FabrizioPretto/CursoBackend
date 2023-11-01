import fs from 'fs';

export class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async getProducts() {

        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    async existCode(n) {
        const array = await this.getProducts()
        return array.some(product => product.code === n);
    }


    async addProduct(obj) {

        const product = {
            id: await this.getMaxId() + 1,
            status: true,
            ...obj,
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU",
        };

        if (obj.title === undefined || obj.title === "") throw new Error("Por favor ingrese un nombre distinto de vacío");
        if (obj.description === undefined || obj.description === "") throw new Error("Por favor ingrese una descripción distinta de vacío");
        if (await this.existCode(obj.code) === true) throw new Error("El código ya existe. Ingrese uno diferente para el nuevo producto");
        if (obj.code === "") throw new Error("Por favor ingrese un código distinto de vacío");
        if (obj.price === undefined || obj.price <= 0) throw new Error("Por favor ingrese un precio mayor a $0");
        if (obj.stock === undefined || obj.stock <= 0) throw new Error("Por favor ingrese un stock mayor a 0");
        if (obj.category === undefined || obj.category === "") throw new Error("Por favor ingrese una categoría distinta de vacío");


        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
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

    async getProductById(id) {

        let actualArray = await this.getProducts()

        const found = actualArray.find((p) => p.id === id);

        try {
            if (found === undefined) return false;
            else return found;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(newProduct, id) {

        try {
            const products = await this.getProducts();

            if (!products.length) {
                return 'There are no products to update'
            }
            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                return 'There is no product with that id'
            }
            else {
                products[index] = { id, ...newProduct };
                await fs.promises.writeFile(this.path, JSON.stringify(products));
            }
        } catch (error) {
            console.error(error)
        }
    }


    async deleteProduct(idNumber) {

        let actualArray = await this.getProducts();
        if (actualArray.length === 0) throw new Error("Aún no existen productos cargados");

        let position = actualArray.findIndex(product => product.id === idNumber);
        if (position === -1) throw new Error("Producto no encontrado con el Id ingresado");

        actualArray.splice(position, 1);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(actualArray));
        } catch (error) {
            console.log(error);
        }
    }

}
