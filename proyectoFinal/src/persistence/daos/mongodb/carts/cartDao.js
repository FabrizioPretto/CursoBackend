import MongoDao from '../mongoDao.js';
import { CartModel } from "./cartModel.js";
import { logger } from '../../../../utils/logsConfig.js';

export default class CartDaoMongoDB extends MongoDao {
    constructor() {
        super(CartModel);
    };

    async addProdToCart(existCart, prodId) {
        try {
            const newProd = {
                "quantity": 1,
                "product": prodId
            };
            existCart.products.push(newProd);
            const response = await this.model.updateOne({ _id: existCart._id }, existCart);
            console.log("response ", response);
            return response;
        } catch (error) {
            logger.error("Error al agregar producto al carrito");
            //console.log(error);
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
            console.log(error);
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
            console.log(error);
        }
    }

    async clearCart(cart) {
        try {
            if (!cart) throw new error("Cart not found");

            cart.products = [];

            const updatedCart = await cart.save();

            return updatedCart;

        } catch (error) {
            console.log(error);
        }
    }
}




/*

    async create() {
        try {
            return await CartModel.create({
                products: [],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            return await CartModel.findById(id).populate("products.product");
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async addProdToCart(cart, prodId) {
        try {
            // const cart = await CartModel.findById(cartId);
            // console.log(cart);
            // if (!cart) return false;
            cart.products.push({ product: prodId });
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async removeProdToCart(cart, prod) {
        try {
            cart.products = cart.products.filter(
                (p) => p.product._id.toString() !== prod.product._id.toString()
            );
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProdQuantityToCart(cart, prod, quantity) {
        try {
            prod.quantity = quantity;
            cart.save();
            return prod;
        } catch (error) {
            console.log(error);
        }
    }

    async clearCart(cart) {
        try {
            cart.products = [];
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
}*/