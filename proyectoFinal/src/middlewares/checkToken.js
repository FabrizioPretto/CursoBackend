import jwt from 'jsonwebtoken';
//import { PRIVATE_KEY } from "../jwt/auth.js";
import UserMongoDao from '../persistence/daos/mongodb/users/userDao.js';
const userDao = new UserMongoDao();
//import factory from "../persistence/daos/factory.js";
//const { userDao } = factory;
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
export const checkToken = async (req, res, next) => {
    try {
        //req.headers("Authorization")
        const authHeader = req.get("Authorization");
        if (!authHeader) return res.status(401).json({ msg: "Unauthorized 1" });
        console.log("authHeader ", authHeader);
        const token = authHeader.split(" ")[1];
        //ojo mayúsculas
        console.log(token);
        const decode = jwt.verify(token, SECRET_KEY_JWT);
        console.log("decode ", decode);//payload
        const user = await userDao.getById(decode.userId);
        console.log("user ", user);
        if (!user) return res.status(401).json({ msg: "Unauthorized 2" });
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}

//line 23 await userDao.getUserById(decode.userId)