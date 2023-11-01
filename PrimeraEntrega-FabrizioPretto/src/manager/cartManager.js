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
        try {
            const carts = await this.getCarts();
            const maxId = carts.reduce((max, item) => (item.id > max ? item.id : max), 0);
            return maxId;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    async getCartById(cid) {

        const cartsArray = await this.getCarts()

        if (cartsArray === undefined) return false;
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
