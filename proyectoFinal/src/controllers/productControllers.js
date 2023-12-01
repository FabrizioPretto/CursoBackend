//import { ProductManager } from "../daos/fileSystem/productManager.js";
//const productManager = new ProductManager('./src/files/products.json');
//CAMBIAR A MONGO PRODUCT

import * as service from "../services/productServices.js";

import { ProductManagerMongoDB } from "../daos/mongodb/productMongodbManager.js";
const productManagerMongoDB = new ProductManagerMongoDB();

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await service.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error.message);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.getProductById(id);
        if (product === false) res.status(404).json({ msg: "Product not found" });
        else res.status(200).json(product);
    } catch (error) {
        next(error.message);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const newProd = await service.createProduct(req.body);
        if (newProd === false) res.status(404).json({ msg: "Error create product!" });
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpdt = await service.updateProduct(req.body, id);
        if (prodUpdt === false) res.status(404).json({ msg: "Error update product!" });
        else res.status(200).json({ msg: `Product id: ${id} deleted` });
    } catch (error) {
        next(error.message);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.deleteProduct(id);
        if (prodDel === false) res.status(404).json({ msg: "Error delete product!" });
        else res.status(200).json(prodDel);
    } catch (error) {
        next(error.message);
    }
}