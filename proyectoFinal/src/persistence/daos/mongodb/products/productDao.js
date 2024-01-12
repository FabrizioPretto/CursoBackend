import MongoDao from "../mongoDao.js";
import { ProductsModel } from "./productModel.js";


export default class ProductMongoDao extends MongoDao {

    constructor() {
        super(ProductsModel);
    }

    async aggregationByLimit(docLimit) {
        try {
            if (docLimit === undefined || docLimit === 0 || docLimit === null) docLimit = 10//|| docLimit isNan

            return await ProductsModel.aggregate([
                {
                    $limit: docLimit
                }
            ])
        } catch (error) {
            console.log(error);
        }
    }

    async aggregationBySort(order) {
        try {
            if (order !== null) {
                if (order === "asc") {
                    return await ProductsModel.aggregate([
                        {
                            $sort: { price: 1 }
                        }
                    ])
                }
                else {
                    return await ProductsModel.aggregate([
                        {
                            $sort: { price: -1 }
                        }
                    ])
                }
            }
            else return await ProductsModel.find({});
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(page = 1, limit = 10) {
        try {
            if (isNaN(page) || isNaN(limit)) { page = 1; limit = 10 };
            return await ProductsModel.paginate({}, { page, limit });
            //return await ProductsModel.find({});
        } catch (error) {
            console.log(error);
        }
    }

    async existCode(n) {
        const array = await this.getProducts();
        return array.some(product => product.code === n);
    }


    async addProduct(obj) {

        const product = {
            id: await this.getMaxId() + 1,
            status: true,
            ...obj,
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU",
        };


        try {
            const products = await ProductsModel.find({});
            products.push(product);
            return await ProductsModel.create(product);
        } catch (error) {
            console.log(error);
        }
    }

    async getMaxId() {
        try {
            const products = await this.getProducts();
            const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
            return maxId;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    async getProductById(id) {

        try {
            return await ProductsModel.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProducts() {
        try {
            const products = await ProductsModel.find({}).lean();
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}