import jwt from 'jsonwebtoken';
import { HttpResponse, errorsDictionary } from '../utils/httpResponse.js';
import UserMongoDao from '../persistence/daos/mongodb/users/userDao.js';
import 'dotenv/config';

const userDao = new UserMongoDao();
const SECRET_KEY = process.env.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const userKind = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, SECRET_KEY);
        const user = await userDao.getById(decode.userId);
        if (user) {
            if (user.role === 'admin' || user.role === 'premium') {
                req.user = user;
                next();
            }
            else httpResponse.Unauthorized(res, errorsDictionary.ERROR_ROLE);
        }


    } catch (error) {
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_ROLE);
    }
}