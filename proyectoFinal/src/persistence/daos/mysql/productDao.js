import MySqlDao from "./mysqlDao.js";
import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMySql extends MySqlDao {
    constructor() {
        super(ProductModel);
    }
}