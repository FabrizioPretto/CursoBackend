import { productCollection } from "../daos/mongodb/models/productModel.js";
import { ProductManagerMongoDB } from "../daos/mongodb/productMongodbManager.js";
const productDao = new ProductManagerMongoDB();
/*
import { ProductManagerFS } from "../daos/fileSystem/productManager.js";
import { __dirname } from "../utils.js";
const prodDao = new ProductManagerFS(
    __dirname + "/daos/fileSystem/productManager.js");*/

export const aggregationBySort = async (order) => {
    try {
        return await productDao.aggregationBySort(order);
    } catch (error) {
        console.log(error);
    }
}

export const aggregationByLimit = async (docLimit) => {
    try {
        return await productDao.aggregationByLimit(docLimit);
    } catch (error) {
        console.log(error);
    }
}

export const getAllProducts = async (page, limit) => {
    try {
        return await productDao.getProducts(page, limit);
    } catch (error) {
        console.log(error);
    }
}

export const getAll = async () => {
    try {
        return await productDao.getAllProducts();
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        const prod = await productDao.getProductById(id);
        if (prod === false) return false;
        else return prod;
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (obj) => {
    try {
        const newProd = await productDao.addProduct(obj);
        if (newProd === false) return false;
        else return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (obj, id) => {
    try {
        const prodUpd = await productDao.updateProduct(obj, id);
        if (prodUpd === false) return false;
        else return prodUpd;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const prodDelete = await productDao.deleteProduct(id);
        if (prodDelete === false) return false;
        else return prodDelete;
    } catch (error) {
        console.log(error);
    }
}