import { log } from 'console';
import fs from 'fs';
import { ProductManager } from '../manager/productManager.js';
const productManager = new ProductManager("./products.json");

export class CartManager {

    constructor(path) {
        this.path = path;
    }

    async createCart() {

        try {
            const cart = {
                id: await this.getMaxId() + 1,
                products: [],
                quantity: 0
            }
            const cartsFile = await this.getCarts();
            cartsFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(carts);
            }
            else return [];
        } catch (error) {
            console.log(error);
        }
    }


    async existCode(n) {
        const array = await this.getCarts()
        return array.some(product => product.code === n);
    }

    async saveProductToCart(idCart, idProd) {
        const carts = await this.getCarts();

        const cartExists = await this.getCartById(idCart);

        let cartIndex = carts.findIndex(idCart);

        console.log("cartExists " + JSON.stringify(cartExists));
        if (cartExists) {
            const existsProd = cartExists.products.find((p) => p.id === idProd)
            if (existsProd) existsProd.quantity + 1
            else {
                const prod = {
                    product: idProd,
                    quantity: 1
                }
                cartExists.products.push(prod);
            }
            carts[cartIndex] = cartExists;
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cartExists;
        }

    }

    async getMaxId() {
        let maxId = 0;
        const carts = await this.getCarts();
        console.log("El length " + carts.length);
        /*carts.map((eachCart) => {
            if (eachCart.id > maxId) maxId = eachCart.id;
        });*/
        return maxId;
    }
    /*async getMaxId() {
        try {
            const carts = await this.getCarts();
            console.log("carts " + carts);
            const maxId = carts.reduce((max, product) => (product.id > max ? product.id : max), 0);
            return maxId;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }*/

    async getCartById(cid) {

        const cartsArray = await this.getCarts()

        if (cartsArray === undefined || cartsArray.length <= 0) return false;
        else {
            const found = cartsArray.find((element) => element.id === cid);

            try {
                if (found === undefined) return false;
                else return found;
            } catch (error) {
                console.log(error);
            }
        }
    }


}
