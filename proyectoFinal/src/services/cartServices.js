import CartsDaoMongoDB from '../persistence/daos/mongodb/old/cartManagerMongodb.js'
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

export const updateCart = async (id, cart) => {
    try {
        let item = await cartDao.getCartById(id);
        if (item === undefined) throw new Error("Cart not found!");
        else {
            const cartUpdated = await cartDao.updateCart(id, cart);
            return cartUpdated;
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProdQuantity = async (cid, pid, quantity) => {
    try {
        const cartUpdated = await cartDao.updateProdQuantity(cid, pid, quantity);
        return cartUpdated;
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

export const deleteProdInCart = async (cid, pid) => {
    try {
        const cartWithoutProd = await cartDao.deleteProdInCart(cid, pid);
        return cartWithoutProd;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductsInCart = async (id) => {
    try {
        const cartToDelete = await cartDao.deleteProductsInCart(id);
        return cartToDelete;
    } catch (error) {
        console.log(error);
    }
}