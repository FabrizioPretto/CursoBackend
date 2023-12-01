import fs from "fs";

//import { ProductManager } from './productManager.js';
//const productManager = new ProductManager("..src/files/products.json");

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        try {
            const cart = {
                id: await this.getMaxId() + 1,
                products: new Array()
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
                if (carts.trim() === "") {
                    return [];
                } else {
                    return JSON.parse(carts);
                }
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getMaxId() {
        let maxId = 0;
        const carts = await this.getCarts();
        carts.map((eachCart) => {
            if (eachCart.id > maxId) maxId = eachCart.id;
        });
        return maxId;
    }

    async getCartById(cid) {

        const cartsArray = await this.getCarts();

        if (cartsArray === undefined || cartsArray <= 0) return false;
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
    /*
    La razón por la que no funciona el carrito, es porque no tenes una
    verificación y acción por si el archivo existe pero está vacío. Es decir, si
    cart.json existe, pero no tiene nada adentro, eso termina rompiedo el
    codigo.
    Tambien no ha sido correcto el desarrollo de la actividad.
    El findIndex está mal implementado. Lo que tenes que usar con el
    findIndex es una callback (una arrow function o una función comun) en la
    que le digas con que comparar. Funciona igual que el find, pero solo te
    devuelve el inidice en el arreglo
    Debes corregir eso para que funcione. Y tené cuidado que cuando se
    crea el carrito, se crea con un “quantity” que eso no es correcto. Solo
    debe ser id y productos. Dentro de productos, tiene que ser id (del
    producto) y quantity( cantidad), que, a lo que veo en codigo, está bien
    hecho
    */

    async saveProductToCart(idCart, idProd) {
        try {

            const cartExists = await this.getCartById(idCart);
            if (cartExists !== undefined) {
                const existProd = cartExists.products.find(p => p.id === idProd);
                if (existProd !== undefined) {
                    existProd.quantity += 1;
                } else {
                    const prod = {
                        product: idProd,
                        quantity: 1
                    };
                    cartExists.products.push(prod);
                }
                console.log("existProd " + JSON.stringify(existProd));
                console.log("cartExists " + JSON.stringify(cartExists.products));
                //const carts = ;
                await fs.promises.writeFile(this.path, JSON.stringify(await this.getCarts()));
                const carts2 = await this.getCarts();
                //console.log("carts " + JSON.stringify(carts));
                console.log("carts2 " + JSON.stringify(carts2));
                return cartExists;
            }
        } catch (error) {
            console.error(error);
        }
    }


}


/*if (cartExists.products === undefined) {
      cartExists.products.push(prod)
      console.log("El cart length " + cartExists.products.length);

  }*/
//await fs.promises.writeFile(this.path, JSON.stringify(carts));
//return cartExists;
/*
const months = ["Jan", "Mar", "Apr", "May"];

// Inserting an element at index 1
const months2 = months.toSpliced(1, 0, "Feb");
console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]
*/

/*if (cartExists !== undefined || cartExists.length === undefined) {
{

}*/




//npm run dev

/*
async saveProductToCart(idCart, idProd) {
    const carts = await this.getCarts();

    const cartExists = await this.getCartById(idCart);

    // let cartIndex = carts.findIndex(idCart);

    // console.log("cartExists " + JSON.stringify(cartExists));
    if (cartExists !== undefined) {
        console.log("cartExists " + JSON.stringify(cartExists));
        const existsProd = cartExists.products.find((p) => p.product === idProd)
        console.log("existsProd " + JSON.stringify(existsProd));
        if (existsProd !== undefined) { existsProd[idProd].product.quantity + 1; console.log("existsProd after +1: " + existsProd); }
        else {
            const prod = {
                product: idProd,
                quantity: 1
            }
            cartExists.products.push(prod);
        }
        carts[idCart - 1].products = cartExists;
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return cartExists;
    }

}*/
