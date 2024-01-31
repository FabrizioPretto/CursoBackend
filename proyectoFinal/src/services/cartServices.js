import factory from '../persistence/daos/factory.js';
import Services from './classServices.js';
const { cartDao, prodDao } = factory;


export default class CartServices extends Services {
    constructor() {
        super(cartDao);
    };

    async remove(id) {
        try {
            const cartToDel = await cartDao.delete(id.toString());
            if (!cartToDel) return false;
            else return cartToDel;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProdToCart(cartId, prodId) {
        try {
            let existCart = await cartDao.getById(cartId);

            if (!existCart) return false;

            const existProd = await prodDao.getById(prodId);

            if (!existProd) return false;

            const existProdInCart = existCart.products.find((p) => {
                return p.product._id.toString() === prodId.toString();
            })

            if (existProdInCart) {
                existProdInCart.quantity++;
                existCart.save();
                return existProdInCart;
            }
            else { return await cartDao.addProdToCart(existCart, prodId) };

        } catch (error) {
            throw new Error(error);
        }
    }

    async removeProdFromCart(cartId, prodId) {
        try {
            const existCart = await cartDao.getById(cartId);

            if (!existCart) return false//throw new error("Cart not found");

            const existProd = await prodDao.getById(prodId);

            if (!existProd) return false//throw new error("Product not found");

            const existProdInCart = existCart.products.find((p) => p.product._id.toString() === prodId.toString());
            //console.log(existProdInCart.quantity);
            if (existProdInCart && existProdInCart.quantity > 1) {
                existProdInCart.quantity--;
                await existCart.save();
                return existProdInCart;
            }
            else return await cartDao.removeProdFromCart(existCart, existProd);

        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProdQuantityToCart(cartId, prodId, quantity) {
        try {
            const existCart = await cartDao.getById(cartId);

            if (!existCart) return false;

            const existProd = existCart.products.find((p) => p.product._id.toString() === prodId.toString());

            if (!existProd) return false;

            if (quantity <= 0) return false;

            return await cartDao.updateProdQuantityToCart(existCart, existProd, quantity);

        } catch (error) {
            throw new Error(error);
        }
    }

    async clearCart(cartId) {
        try {
            const existCart = await cartDao.getById(cartId);

            if (!existCart) return false;
            else return await cartDao.clearCart(existCart);

        } catch (error) {
            throw new Error(error);
        }
    }

}








/*
export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        console.log(error);
    }
};

export const updateCart = async (cid, pid, quantity) => {
    try {
        return await cartDao.updateCantidad(cid, pid, quantity);
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        const carro = await cartDao.getById(id);
        if (!carro) return false;
        else return carro;
    } catch (error) {
        console.log(error);
    }
};

export const create = async () => {
    try {
        const newCart = cartDao.create();
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (cid, pid) => {
    try {
        const cartDel = await cartDao.remove(cid, pid);
        if (!cartDel) return false;
        else return cartDel;
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = async (cid, pid) => {
    try {
        const cart = await cartDao.getById(cid);
        const product = pid;
        if (!cart || !product) return false;
        else {
            const response = await cartDao.addProdToCart(cart, product);
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};
export const removeAll = async (cid) => {
    try {
        if (!cid) {
            return false;
        } else {
            const response = await cartDao.removeAll(cid);
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};
*/













/*import CartsDaoMongoDB from '../persistence/daos/mongodb/old/cartManagerMongodb.js'
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
}*/