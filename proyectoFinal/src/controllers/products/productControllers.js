import Controllers from "../classControllers.js";
import ProductService from "../../services/products/productServices.js";
const productService = new ProductService();
import { HttpResponse, errorsDictionary } from "../../utils/httpResponse.js";
const httpResponse = new HttpResponse();
import UserServices from "../../services/user/userServices.js";
const userServices = new UserServices();

export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    }

    generateMockProducts = async (req, res, next) => {
        try {
            let quantity = 100;
            const response = await productService.generateMockProducts(quantity);
            if (!response) return httpResponse.ServerError(res, errorsDictionary.ERROR_MOCK_PRODUCTS);
            else return httpResponse.Ok(res, response);
        } catch (error) {
            next(error);
        }
    }


    //NUEVO
    getProdById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const prod = await productService.getProdById(id)
            if (!prod) return httpResponse.NotFound(res, errorsDictionary.ERROR_GET_BY_ID);
            else return httpResponse.Ok(res, prod);
        } catch (error) {
            next(error);
        }
    }

    getProductById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await productService.getProdById(id);
            if (product === false) return httpResponse.NotFound(res, errorsDictionary.PRODUCT_NOT_FOUND);
            else return httpResponse.Ok(res, product);
        } catch (error) {
            next(error);
        }
    }

    createProduct = async (req, res, next) => {
        try {
            const newProd = await productService.createProduct(req.body, req.user.email);
            if (newProd === false) return httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_PRODUCT);
            else return httpResponse.Ok(res, newProd)
        } catch (error) {
            next(error);
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const prodUpdt = await productService.updateProduct(req.body, id);
            if (prodUpdt === false) return httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_PRODUCT);
            else return httpResponse.Ok(res, prodUpdt);
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const existProd = await productService.getProdById(id)
            if (!existProd) return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_PRODUCT)
            else {
                if (req.user.role != 'admin') return httpResponse.Unauthorized(res, errorsDictionary.ERROR_ROLE);
                else {
                    if (existProd.role === 'premium') {
                        let userPremium = await userServices.getUserByEmail(existProd.user);
                        await productService.sendPremiumMail(userPremium, id);
                    }
                    const prodDel = await productService.deleteProduct(id);
                    return httpResponse.Ok(res, prodDel);
                }
            }
        } catch (error) {
            next(error);
        }
    }

    aggregationBySort = async (req, res, next) => {
        try {
            const { order } = req.query;
            const orderProducts = await productService.aggregationBySort(order);
            res.status(200).json(orderProducts);
        } catch (error) {
            next(error);
        }
    }

    aggregationByLimit = async (req, res, next) => {
        try {
            const { limit } = req.params;
            const productsLimit = await productService.aggregationByLimit(Number(limit));
            res.status(200).json(productsLimit);
        } catch (error) {
            next(error);
        }
    }

    getAllProducts = async (req, res, next) => {
        try {
            const { page, limit } = req.query

            const response = await productService.getAllProducts(Number(page), Number(limit));
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
            next(error);
        }
    }

}
