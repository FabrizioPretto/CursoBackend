import jwt from 'jsonwebtoken';
import UserMongoDao from '../persistence/daos/mongodb/users/userDao.js';
import 'dotenv/config';
import { HttpResponse, errorsDictionary } from '../utils/httpResponse.js';

const userDao = new UserMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const checkToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
        const decode = jwt.verify(token, SECRET_KEY_JWT);
        const user = await userDao.getById(decode.userId);
        if (!user) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_USER_NOT_FOUND);
        req.user = user;
        next();
    } catch (error) {
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
    }
}
