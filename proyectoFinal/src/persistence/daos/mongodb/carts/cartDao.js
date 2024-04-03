import MongoDao from '../mongoDao.js';
import { CartModel } from "./cartModel.js";
import { logger } from '../../../../utils/logsConfig.js';

export default class CartDaoMongoDB extends MongoDao {
    constructor() {
        super(CartModel);
    };

    async createCart(data) {
        try {
            const newCart = await CartModel.create(data);
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getAllCarts(userEmail) {
        try {
            const response = await CartModel.find({ "email": userEmail });
            return response;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async addProdToCart(existCart, prodId) {
        try {
            const newProd = {
                "quantity": 1,
                "product": prodId
            };
            existCart.products.push(newProd);
            const response = await this.model.updateOne({ _id: existCart._id }, existCart);
            return response;
        } catch (error) {
            throw new Error(error.message);

        };
    };

    async removeProdFromCart(existCart, productToRemove) {
        try {
            if (!existCart) throw new error("Cart not found");

            if (!existCart.products || existCart.products.length === 0) throw new error("Cart is empty");

            if (!productToRemove._id) throw new error("Product without ID");

            const prodIndex = existCart.products.findIndex((p) => p.product._id.toString() === productToRemove._id.toString());

            if (prodIndex === -1) throw new error("Product not found in cart");

            console.log("LENGTH ", existCart.products.length);
            existCart.products.splice(prodIndex, 1);

            const updatedCart = await existCart.save();

            return updatedCart;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProdQuantityToCart(existCart, existProd, quantity) {
        try {

            const prodIndex = existCart.products.findIndex((p) => p.product._id.toString() === existProd.product._id.toString());

            if (prodIndex === -1) throw new error("Product not found in cart");

            existCart.products[prodIndex].quantity = quantity;

            const updatedCart = await existCart.save();

            return updatedCart;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async clearCart(cart) {
        try {
            if (!cart) throw new error("Cart not found");

            cart.products = [];

            const updatedCart = await cart.save();

            return updatedCart;

        } catch (error) {
            throw new Error(error.message);
        }
    }
}


