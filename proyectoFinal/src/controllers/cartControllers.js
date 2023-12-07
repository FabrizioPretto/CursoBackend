import * as service from "../services/cartServices.js";

export const getAllCarts = async (req, res, next) => {
    try {
        const carts = await service.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const newCart = await service.addProductToCart(idProd, idCart);
        res.json(newCart);
    } catch (error) {
        next(error);
    }
}

export const getCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await service.getCartById(id);
        if (item === false) throw new Error("Cart not found!");
        else res.json(item);
    } catch (error) {
        next(error);
    }
}

export const createCart = async (req, res, next) => {
    try {

        const newCart = await service.createCart();
        if (!newCart) throw new Error("Error Creating Cart!");
        else {
            res.status(201).json({ msg: "Carrito creado con éxito " + newCart });
        }
    } catch (error) {
        next(error);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { cart } = req.params;
        const cartUpdated = await service.updateCart(id, cart);
        if (cartUpdated === false) throw new Error("Validation Error!");
        else res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartDeleted = await service.deleteCart(id);
        if (cartDeleted === false) throw new Error("Validation Error!");
        else res.json(cartDeleted);
    } catch (error) {
        next(error);
    }
}

export const deleteProdInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cartWithoutProd = await service.deleteProdInCart(cid, pid);
        res.status(200).json({ msg: "Producto eliminado con éxito " + cartWithoutProd });
    } catch (error) {
        console.log(error);
    }
}
export const deleteProductsInCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartToDelete = await service.deleteProductsInCart(id);
        if (cartToDelete === undefined) {
            throw new Error("El carrito está vacío!");
        }
        else {
            console.log("El contenido del Cart a vaciar: " + cartToDelete.products);
            res.json(cartToDelete)//.msg("El carrito ya no cuenta con productos");
        }

    } catch (error) {
        console.log(error);
    }
}
