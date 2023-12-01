import CartsDaoMongoDB from "../daos/mongodb/cartManagerMongodb.js";
const cartDao = new CartsDaoMongoDB();


export const getCartById = async (id) => {
    try {
        const cart = await cartDao.getCartById(id);
        if (cart === false) throw new Error("Cart not found!");
        else return cart;
    } catch (error) {
        console.log(error);
    }
}

export const getAllCarts = async () => {

    try {
        return await cartDao.getAllCarts();
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (prodId, cartId) => {
    try {
        const exists = await cartDao.getCartById(cartId);
        const newProd = await cartDao.addProductToCart(prodId, cartId);
        if (exists === false) throw new Error('Cart not found');
        else return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const createCart = async () => {
    try {
        const newCart = await cartDao.createCart();
        if (newCart === false) throw new Error("Validation Error!");
        else return newCart;
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (id, obj) => {
    try {
        let item = await cartDao.getCartById(id);
        if (item === false) throw new Error("Cart not found!");
        else {
            const cartUpdated = await cartDao.updateCart(id, obj);
            return cartUpdated;
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteCart = async (id) => {
    try {
        const cartDeleted = await cartDao.deleteCart(id);
        return cartDeleted;
    } catch (error) {
        console.log(error);
    }
}