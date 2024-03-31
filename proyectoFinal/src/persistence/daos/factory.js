import ProductMongoDao from './mongodb/products/productDao.js';
import UserMongoDao from './mongodb/users/userDao.js';
import CartDaoMongoDB from './mongodb/carts/cartDao.js'
import TicketMongoDao from './mongodb/tickets/ticketDao.js';
import { initMongoDB } from '../../config/connection.js';
/*-----------------------------------------------------*/
import ProductManagerFS from './fileSystem/productManager.js';
/*-----------------------------------------------------*/
import ProductDaoMySql from './mysql/productDao.js';
import UserDaoMySql from './mysql/userDao.js';
import { initMySqlDB } from './mysql/connection.js';
/*-----------------------------------------------------*/
import 'dotenv/config';

let userDao;
let prodDao;
let cartDao;
let ticketDao;
//const persistence = process.env.PERSISTENCE;
let persistence = process.argv[2];

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
        cartDao = new CartDaoMongoDB();
        ticketDao = new TicketMongoDao();
        console.log(persistence);
        break;
    case "MYSQL":
        await initMySqlDB();
        userDao = new UserDaoMySql();
        prodDao = new ProductDaoMySql();
        console.log(persistence);
        break;
    default:
        prodDao = new ProductMongoDao();
        cartDao = new CartDaoMongoDB();
        //prodDao = new ProductManagerFS('./src/persistence/daos/fileSystem/productManager.js')
        break;
}

export default { userDao, prodDao, cartDao, ticketDao };

