import ProductMongoDao from './mongodb/products/productDao.js';
import UserMongoDao from './mongodb/users/userDao.js';
import ProductManagerFS from './fileSystem/productManager.js';
import 'dotenv/config';
import { initMongoDB } from '../../config/connection.js';

let userDao;
let prodDao;
const persistence = process.env.PERSISTENCE;

switch (persistence) {
    case "FS":
        //userDao = 
        prodDao = new ProductManagerFS('./src/persistence/daos/fileSystem/productManager.js')
        console.log(persistence);
        break;
    case "MONGO":
        await initMongoDB();
        userDao = new UserMongoDao();
        prodDao = new ProductMongoDao();
        console.log(persistence);
        break;
    default:
        prodDao = new ProductManagerFS('./src/persistence/daos/fileSystem/productManager.js')
        break;
}

export default { userDao, prodDao };