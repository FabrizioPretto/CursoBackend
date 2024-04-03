import jwt from 'jsonwebtoken';
import UserMongoDao from '../persistence/daos/mongodb/users/userDao.js';
import 'dotenv/config';
import { HttpResponse, errorsDictionary } from '../utils/httpResponse.js';

const userDao = new UserMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
        const decode = jwt.verify(token, SECRET_KEY_JWT);
        const user = await userDao.getById(decode.userId);
        if (!user) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
    }
}