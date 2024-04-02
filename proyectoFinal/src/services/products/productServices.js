import Services from "../classServices.js";
import factory from "../../persistence/daos/factory.js";
const { prodDao } = factory;
import ProductRepository from "../../repository/productRepository.js";
const prodRepository = new ProductRepository();
import { generateMockProducts } from '../../utils/utils.js';
import { sendMails } from "../others/emailServices.js";

export default class ProductService extends Services {

    constructor() {
        super(prodDao);
    }

    async generateMockProducts(quantity) {
        try {
            const productsArray = [];
            for (let i = 0; i < quantity; i++) {
                let product = generateMockProducts();
                productsArray.push(product);
            }
            return productsArray;
        } catch (error) {
            throw new Error(error);
        }
    }

    getAllProducts = async (page, limit) => {
        try {
            return await prodDao.getProducts(page, limit);
        } catch (error) {
            throw new Error(error);
        }
    }

    getAll = async () => {
        try {
            return await prodDao.getAllProducts();
        } catch (error) {
            throw new Error(error);
        }
    }

    //NUEVO
    getProdById = async (id) => {
        try {
            const prod = await prodRepository.getProdById(id);
            if (!prod) return false;
            else return prod;
        } catch (error) {
            throw new Error(error);
        }
    }

    getProductById = async (id) => {
        try {
            const prod = await prodDao.getProductById(id);
            if (prod === false) return false;
            else return prod;
        } catch (error) {
            throw new Error(error);
        }
    }

    createProduct = async (obj, email) => {
        try {
            obj.user_role = email;
            const newProd = await prodDao.addProduct(obj);
            if (newProd === false) return false;
            else return newProd;
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProduct = async (obj, id) => {
        try {
            const prodUpd = await prodDao.update(obj, id);
            if (prodUpd === false) return false;
            else return prodUpd;
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct = async (id, user) => {
        try {
            const prodDelete = await prodDao.delete(id);
            if (prodDelete === false) return false;
            else return prodDelete;
        } catch (error) {

        }
    }

    sendPremiumMail = async (user, id) => {
        try {
            let prodTitle = await prodDao.getProductById(id);
            sendMails(user, 'premiumMail', prodTitle.title);
        } catch (error) {
            throw new Error(error);
        }
    }


    aggregationBySort = async (order) => {
        try {
            return await prodDao.aggregationBySort(order);
        } catch (error) {
            throw new Error(error);
        }
    }

    aggregationByLimit = async (docLimit) => {
        try {
            return await prodDao.aggregationByLimit(docLimit);
        } catch (error) {
            throw new Error(error);
        }
    }


}


