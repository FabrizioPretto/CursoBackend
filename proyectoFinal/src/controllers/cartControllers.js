import Controllers from './classControllers.js';
import CartServices from '../services/cartServices.js';
import { createResponse } from '../utils/utils.js';
const services = new CartServices();
import { HttpResponse, errorsDictionary } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();

export default class CartControllers extends Controllers {
    constructor() {
        super(services);
    }

    remove = async (req, res, next) => {
        try {
            const { id } = req.params;
            const cartToDel = await services.remove(id.toString());
            if (!cartToDel) return httpResponse.ServerError(res, errorsDictionary.ERROR_DELETE_CART) //createResponse(res, 404, "Error delete cart")
            else return httpResponse.Ok(res, cartToDel);
        } catch (error) {
            next(error);
        }
    }

    addProdToCart = async (req, res, next) => {
        try {
            const { idCart, idProd } = req.params;
            const newProdToUserCart = await services.addProdToCart(idCart, idProd);
            if (!newProdToUserCart) return httpResponse.ServerError(res, errorsDictionary.ERROR_ADD_PRODUCT_TO_CART); //createResponse(res, 404, "Error adding product to cart");
            else return httpResponse.Ok(res, newProdToUserCart);
        } catch (error) {
            next(error);
        }
    }

    removeProdFromCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const delProdFromUserCart = await services.removeProdFromCart(cid, pid);
            if (!delProdFromUserCart) return httpResponse.ServerError(res, errorsDictionary.ERROR_REMOVE_PRODUCT_FROM_CART);//createResponse(res, 404, "Error removing product from cart");
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
            if (!updateProdQuantity) return httpResponse.ServerError(res, errorsDictionary.ERROR_UPDATE_QUANTITY_IN_CART); //createResponse(res, 404, "Error updating product quantity in cart");
            else return httpResponse.Ok(res, updateProdQuantity);
        } catch (error) {
            next(error);
        }
    }

    clearCart = async (req, res, next) => {
        try {
            const { idCart } = req.params;
            const clearCart = await services.clearCart(idCart);
            if (!clearCart) return httpResponse.ServerError(res, errorsDictionary.ERROR_EMPTYING_CART);//createResponse(res, 404, "Error emptying cart");
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
            if (!response) return httpResponse.ServerError(res, errorsDictionary.ERROR_CART_NOT_FOUND); //createResponse(res, 404, { method: 'getById', error: 'Cart not found' })
            else return httpResponse.Ok(res, response);
        } catch (error) {
            next(error);
        }
    }


}






/*import * as service from '../services/cartServices.js'

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getById(id);
        if (!response) res.status(404).json({ msg: "Cart Not found!" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create();
        if (!newCart) res.status(404).json({ msg: "Error create cart!" });
        else res.status(200).json(newCart);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartUpd = await service.update(id, req.body);
        if (!cartUpd) res.status(404).json({ msg: "Error update cart!" });
        else res.status(200).json(cartUpd);
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartDel = await service.remove(id);
        if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
        else res.status(200).json({ msg: `Cart id: ${id} deleted` });
    } catch (error) {
        next(error.message);
    }
};

export const addProdToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const newProdToUserCart = await service.addProduct(idCart, idProd);
        if (!newProdToUserCart) res.json({ msg: "Error add product to cart" });
        else res.json(newProdToUserCart);
    } catch (error) {
        next(error.message);
    }
};

export const removeProdToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const delProdToUserCart = await service.removeProdToCart(
            idCart,
            idProd,
        );
        if (!delProdToUserCart) res.json({ msg: "Error remove product to cart" });
        else res.json({ msg: `product ${idProd} deleted to cart` });
    } catch (error) {
        next(error.message);
    }
};

export const updateProdQuantityToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const { quantity } = req.body;
        const updateProdQuantity = await service.updateProdQuantityToCart(
            idCart,
            idProd,
            quantity
        );
        if (!updateProdQuantity) res.json({ msg: "Error update product quantity to cart" });
        else res.json(updateProdQuantity);
    } catch (error) {
        next(error.message);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const clearCart = await service.clearCart(
            idCart,
        );
        if (!clearCart) res.json({ msg: "Error clear cart" });
        else res.json(clearCart);
    } catch (error) {
        next(error.message);
    }
};
*




/*import * as service from "../services/cartServices.js";

export const getAllCarts = async (req, res, next) => {
    try {
        const carts = await service.getAllCarts();
        if (carts === undefined) res.status(401).json({ msg: "No se pudieron obtener los carritos!" });
        else res.status(200).json(carts);
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const newCart = await service.addProductToCart(idProd, idCart);
        if (!newCart) res.status(401).json({ msg: "El carrito o el producto ingresados no son correctos!" });
        else res.status(200).json(newCart);
    } catch (error) {
        next(error);
    }
}

export const getCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await service.getCartById(id);
        if (item === false || item === undefined) res.status(401).json({ msg: "El carrito solicitado no existe!" });
        else res.json(item);
    } catch (error) {
        next(error);
    }
}

export const createCart = async (req, res, next) => {
    try {

        const newCart = await service.createCart();
        if (!newCart) res.status(401).json({ msg: "No pudo crearse un nuevo carrito!" });
        else {
            res.status(200).json({ msg: "Carrito creado con éxito " + newCart });
        }
    } catch (error) {
        next(error);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartUpdated = await service.updateCart(id, req.body);
        if (cartUpdated === false) res.status(401).json({ msg: "El carrito no fue actualizado!" });
        else res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
}

export const updateProdQuantity = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const cartUpdated = await service.updateProdQuantity(cid, pid, quantity)

        if (quantity === undefined || quantity === null)
            res.status(401).json({ msg: "Error en la cantidad informada!" });
        else
            res.status(200).json(cartUpdated);
    } catch (error) {
        next(error);
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartDeleted = await service.deleteCart(id);
        if (cartDeleted === false) res.status(401).json({ msg: "El carrito no fue vaciado!" });
        else res.status(200).json({ msg: "Carrito vaciado con éxito" + cartDeleted });
    } catch (error) {
        next(error);
    }
}

export const deleteProdInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cartWithoutProd = await service.deleteProdInCart(cid, pid);
        if (cartWithoutProd === undefined) res.status(401).json({ msg: "No fue posible eliminar el producto del carrito!" });
        res.status(200).json({ msg: "Producto eliminado con éxito " + cartWithoutProd });
    } catch (error) {
        console.log(error);
    }
}
export const deleteProductsInCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartToDelete = await service.deleteProductsInCart(id);
        if (cartToDelete === undefined) res.status(401).json({ msg: "El carrito está vacío!" });
        else res.json({ msg: "El carrito ya no cuenta con productos" + cartToDelete });
    } catch (error) {
        console.log(error);
    }
}
*/