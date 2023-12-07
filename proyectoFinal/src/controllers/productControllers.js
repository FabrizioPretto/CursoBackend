//import { ProductManager } from "../daos/fileSystem/productManager.js";
//const productManager = new ProductManager('./src/files/products.json');
//CAMBIAR A MONGO PRODUCT

/*import { ProductManagerMongoDB } from "../daos/mongodb/productMongodbManager.js";
const productManagerMongoDB = new ProductManagerMongoDB();*/

import * as service from "../services/productServices.js";

export const aggregationBySort = async (req, res, next) => {
    try {
        const { order } = req.query;
        const orderProducts = await service.aggregationBySort(order);
        res.status(200).json(orderProducts);
    } catch (error) {
        next(error.message);
    }
}

export const aggregationByLimit = async (req, res, next) => {
    try {
        const { limit } = req.params;
        const productsLimit = await service.aggregationByLimit(Number(limit));
        res.status(200).json(productsLimit);
    } catch (error) {
        next(error.message)
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit } = req.query

        const response = await service.getAllProducts(Number(page), Number(limit));
        const prev = response.hasPrevPage ? `http://localhost:8080/api/products/?page=${response.prevPage}&limit=10` : null;
        const next = response.hasNextPage ? `http://localhost:8080/api/products/?page=${response.nextPage}&limit=10` : null;
        //res.json(response);
        res.json({
            status: "success",
            payload: response.docs,
            info: {
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: prev,
                nextLink: next
            }
        })

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