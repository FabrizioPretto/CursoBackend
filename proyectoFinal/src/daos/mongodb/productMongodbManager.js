import { ProductsModel } from "./models/productModel.js";

export class ProductManagerMongoDB {

    async getProducts() {
        try {
            return await ProductsModel.find({});
        } catch (error) {
            console.log(error);
        }
    }

    async existCode(n) {
        const array = await this.getProducts()
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
            const products = await this.getProducts();
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

    async updateProduct(newProduct, id) {

        try {
            return await ProductsModel.findByIdAndUpdate({ _id: id }, newProduct, { new: true });
        } catch (error) {
            console.error(error)
        }
    }


    async deleteProduct(idNumber) {

        try {
            return await ProductsModel.findByIdAndDelete(idNumber)
        } catch (error) {
            console.log(error);
        }
    }
}