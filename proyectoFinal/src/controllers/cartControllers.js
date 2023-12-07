import * as service from "../services/cartServices.js";

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
