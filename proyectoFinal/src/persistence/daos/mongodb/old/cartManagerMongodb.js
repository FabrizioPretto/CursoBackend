import { CartModel } from "../carts/cartModel.js"


export default class CartDaoMongoDB {

    async getCartById(id) {
        try {
            const response = await CartModel.findById(id).populate('products.product');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllCarts() {
        try {
            const response = await CartModel.find({})
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart() {
        try {
            const response = await CartModel.create({ products: [] });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(id, cart) {
        try {
            const response = await CartModel.findByIdAndUpdate(id, cart, { new: true })
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProdQuantity(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid);
            let index = cart.products.findIndex((element) => element.product._id.toString() === pid.toString());
            cart.products[index].quantity = quantity;
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {
            const response = await CartModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    //MANEJO DE ERRORES
    async deleteProdInCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid);
            let index = cart.products.findIndex((element) => element.product._id.toString() === pid.toString());
            cart.products.splice(index, 1);
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductsInCart(id) {
        try {
            const response = await CartModel.findById(id);
            response.products = [];
            response.save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async addProductToCart(prodId, cartId) {
        try {

            const cart = await CartModel.findOne({ _id: cartId });

            if (cart.products.some((element) => element.product._id == prodId)) {
                const indexProd = cart.products.findIndex(
                    (element) => element.product._id == prodId
                );
                cart.products[indexProd].quantity += 1;
            } else {
                cart.products.push({ product: prodId });
            }
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
}