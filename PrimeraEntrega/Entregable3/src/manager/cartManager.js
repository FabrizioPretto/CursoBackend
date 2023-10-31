import { log } from 'console';
import fs from 'fs';
import { ProductManager } from '../manager/productManager.js';
const productManager = new ProductManager("./src/products.json");

export class CartManager {

    constructor(path) {
        this.path = path;
    }

    async createCart() {

        try {
            const cart = {
                id: await this.getMaxId() + 1,
                products: []
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
        const cartExists = await this.getCartById(idCart)
        console.log("Carts " + carts);
        console.log("cartExists " + cartExists);
        if (cartExists !== undefined) {
            const prod = {
                product: idProd,
                quantity: 1
            }
            console.log(cartExists.id);
            cartExists.products.push(prod);
            await fs.promises.writeFile(this.path, JSON.stringify(cartExists));
            return cartExists;
        }
    }

    //await fs.promises.writeFile(this.path, JSON.stringify(cartExists));
    //return cartExists;
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

/*
async saveProductToCart(idCart, idProd) {

        const carts = await this.getCarts();
        const cartExists = await this.getCartById(idCart);
        //cartExists.products = new Array();
        //const productExists = await this.existCode(idProd);
        //console.log("Product Exists" + productExists);
        //if (cartExists) {//const found = actualArray.find((p) => p.id === id);
        console.log("CartExists " + cartExists);
        console.log("CartExistsArray " + cartExists.products);

        if (cartExists.products === undefined || cartExists.products.length === 0) {
            const prod = {
                product: idProd,
                quantity: 1
            }
            cartExists.products.push(prod);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
        }
        else {
            const existProduct = cartExists.products.find((p) => p.id === idProd);
            if (existProduct) existProduct.quantity + 1;
            {
                cartExists.products.push(prod);
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
            }
        }












        /* const existProduct = cartExists.products.find((p) => p.id === idProd);
         console.log("ExistProduct" + existProduct);
         if (existProduct) existProduct.quantity + 1;
         else {
             const prod = {
                 product: idProd,
                 quantity: 1
             }
             cartExists.products.push(prod);
         }
     }*/

//await fs.promises.writeFile(this.path, JSON.stringify(cartExists));
//return cartExists;

/*const product = {
    id: await this.getMaxId() + 1,
    idProd: id,
    quantity: units
}*/
// }
