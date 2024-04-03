import jwt from 'jsonwebtoken';
import UserMongoDao from '../persistence/daos/mongodb/users/userDao.js';
import 'dotenv/config';
import { HttpResponse, errorsDictionary } from '../utils/httpResponse.js';

const userDao = new UserMongoDao();
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
        const token = authHeader.split(" ")[1];
        if (!token) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
        const decode = jwt.verify(token, SECRET_KEY_JWT);
        const user = await userDao.getById(decode.userId);
        if (!user || user.role != 'admin') return httpResponse.Unauthorized(res, errorsDictionary.ERROR_ROLE);
        req.user = user;
        next();
    } catch (error) {
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
    }
}

/*
export const verifyToken = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
    try {
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, SECRET_KEY);
        console.log("Token decodificado");
        console.log(decode);
        const user = await userDao.getById(decode.userId);
        if (!user || user.role != 'admin') {
            console.log(user.role)
            return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
        } else {
            req.user = user;
            next();
        };
    } catch (error) {
        console.log(error);
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
    };
};*/