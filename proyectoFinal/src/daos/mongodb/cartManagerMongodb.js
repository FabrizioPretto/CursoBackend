import { CartModel } from "../mongodb/models/cartModel.js"


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

    async updateCart(id, obj) {
        try {
            await CartModel.updateOne({ _id: id }, obj);
            return obj;
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

    async deleteProdInCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid);

            let index = cart.products.findIndex((element) =>
                element._id.toString() === pid.toString()
            );
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

            if (cart.products.some((elemento) => elemento._id == prodId)) {
                const indexProd = cart.products.findIndex(
                    (elemento) => elemento._id == prodId
                );
                cart.products[indexProd].quantity += 1;
            } else {
                cart.products.push(prodId);
            }
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
}