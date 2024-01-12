import jwt from 'jsonwebtoken';
//import { UserMongoDao } from '../daos/mongodb/users/userDao.js';
//const userDao = new UserMongoDao();
import 'dotenv/config'

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export const generateToken = (user) => {
    const payload = {
        userId: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: '20m' });

    return token;
}