import Controllers from '../classControllers.js';
import CartServices from '../../services/cart/cartServices.js';
const services = new CartServices();
import { HttpResponse, errorsDictionary } from '../../utils/httpResponse.js';
const httpResponse = new HttpResponse();


export default class CartControllers extends Controllers {
    constructor() {
        super(services);
    }

    createCart = async (req, res, next) => {
        try {
            const { email } = req.user;
            const newCart = await services.createCart(req.body, email);
            return httpResponse.Ok(res, newCart);
        } catch (error) {
            next(error);
        }
    }

    getAllCarts = async (req, res, next) => {
        try {
            const { email } = req.user;
            const carts = await services.getAllCarts(email);
            if (!carts) return httpResponse.NotFound(errorsDictionary.ERROR_EMPTY_CART);
            else return httpResponse.Ok(res, carts);
        } catch (error) {
            next(error);
        }
    }

    remove = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { email } = req.user;
            const cartToDel = await services.remove(id, email);
            if (!cartToDel) return httpResponse.ServerError(res, errorsDictionary.ERROR_DELETE_CART)
            else return httpResponse.Ok(res, cartToDel);
        } catch (error) {
            next(error);
        }
    }

    getCartById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { email } = req.user;
            const cart = await services.getCartById(id, email);
            if (!cart) return httpResponse.NotFound(res, errorsDictionary.ERROR_CART_NOT_FOUND);
            else return httpResponse.Ok(res, cart);
        } catch (error) {
            next(error);
        }
    }

    addProdToCart = async (req, res, next) => {
        try {
            const { email } = req.user;
            const { idCart, idProd } = req.params;
            const newProdToUserCart = await services.addProdToCart(idCart, idProd, email);
            if (!newProdToUserCart) return httpResponse.ServerError(res, errorsDictionary.ERROR_ADD_PRODUCT_TO_CART);
            else return httpResponse.Ok(res, newProdToUserCart);
        } catch (error) {
            next(error);
        }
    }

    removeProdFromCart = async (req, res, next) => {
        try {
            const { email } = req.user;
            const { cid, pid } = req.params;
            const delProdFromUserCart = await services.removeProdFromCart(cid, pid, email);
            if (!delProdFromUserCart) return httpResponse.ServerError(res, errorsDictionary.ERROR_REMOVE_PRODUCT_FROM_CART);
            else return httpResponse.Ok(res, delProdFromUserCart);
        } catch (error) {
            next(error);
        }
    }

    updateProdQuantityToCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updateProdQuantity = await services.updateProdQuantityToCart(cid, pid, quantity);
            if (!updateProdQuantity) return httpResponse.ServerError(res, errorsDictionary.ERROR_UPDATE_QUANTITY_IN_CART);
            else return httpResponse.Ok(res, updateProdQuantity);
        } catch (error) {
            next(error);
        }
    }

    clearCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const { email } = req.user;
            const clearCart = await services.clearCart(cid, email);
            if (!clearCart) {
                return httpResponse.ServerError(res, errorsDictionary.ERROR_EMPTYING_CART);
            }
            else return httpResponse.Ok(res, clearCart);
        } catch (error) {
            next(error);
        }
    }

    getByIdWithPopulate = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await services.getById(id);
            await response.populate('products.product');
            if (!response) return httpResponse.ServerError(res, errorsDictionary.ERROR_CART_NOT_FOUND);
            else return httpResponse.Ok(res, response);
        } catch (error) {
            next(error);
        }
    }


}

