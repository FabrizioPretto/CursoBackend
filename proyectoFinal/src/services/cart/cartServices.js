import factory from '../../persistence/daos/factory.js';
import Services from '../classServices.js';
const { cartDao, prodDao } = factory;


export default class CartServices extends Services {
    constructor() {
        super(cartDao);
    };

    async createCart(data, email) {
        try {
            data.email = email;
            const newCart = await cartDao.createCart(data);
            return newCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllCarts(email) {
        try {
            const carts = await cartDao.getAllCarts(email);
            if (!carts) return false;
            else return carts;
        } catch (error) {
            throw new Error(error);
        }
    }

    async remove(id, email) {
        try {
            const cart = await cartDao.getById(id);
            if (!cart) return false;
            else {
                if (cart.email != email) return false;
                else {
                    const cartToDel = await cartDao.delete(id);
                    return cartToDel;
                }
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartById(cartId, email) {
        try {
            const cart = await cartDao.getById(cartId);
            if (!cart) return false;
            else {
                if (cart.email != email) {
                    return false;
                }
                else return cart;
            }
        } catch (error) {
            throw new Error(error);
        }
    }


    async addProdToCart(cartId, prodId, email) {
        try {
            let existCart = await cartDao.getById(cartId);

            if (!existCart) return false;

            if (existCart.email != email) return false;
            else {
                const existProd = await prodDao.getById(prodId);

                if (!existProd) return false;

                const existProdInCart = existCart.products.find((p) => {
                    return p.product._id.toString() === prodId.toString();
                })

                if (existProdInCart) {
                    existProdInCart.quantity++;
                    existCart.save();
                    return await cartDao.getById(cartId);
                }
                else return await cartDao.addProdToCart(existCart, prodId);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeProdFromCart(cartId, prodId, email) {
        try {
            const existCart = await cartDao.getById(cartId);
            if (existCart.email != email) return false;
            else {
                if (!existCart) return false

                const existProd = await prodDao.getById(prodId);

                if (!existProd) return false

                const existProdInCart = existCart.products.find((p) => p.product._id.toString() === prodId.toString());

                if (existProdInCart && existProdInCart.quantity > 1) {
                    existProdInCart.quantity--;
                    await existCart.save();
                    return existProdInCart;
                }
                else return await cartDao.removeProdFromCart(existCart, existProd);
            }

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

    async clearCart(cid, email) {
        try {
            const existCart = await cartDao.getById(cid);
            if (existCart.email != email) return false;
            else {
                if (!existCart) return false;
                else return await cartDao.clearCart(existCart);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}
