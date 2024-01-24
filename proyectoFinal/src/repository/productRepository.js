import factory from "../persistence/daos/factory.js";
const { prodDao } = factory;
import ProductResDTO from "../persistence/dtos/productResDto.js";
import ProductReqDTO from "../persistence/dtos/productReqDto.js";

export default class ProductRepository {
    constructor() {
        this.dao = prodDao;
    }

    async getProdById(id) {
        try {
            const prod = await this.dao.getById(id);
            return new ProductResDTO(prod);
        } catch (error) {
            console.log(error);
        }
    }

    async createProd(obj) {
        try {
            const prodDTO = new ProductReqDTO(obj);
            const response = await this.dao.create(prodDTO);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
