import Services from "./classServices.js";
import factory from "../persistence/daos/factory.js";
const { userDao } = factory;
import jwt from "jsonwebtoken";
import UserRepository from '../repository/userReporistory.js';
const userRepository = new UserRepository();
import "dotenv/config";
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;


export default class UserServices extends Services {
    constructor() {
        super(userDao);
    }

    getUserByEmail = async (email) => {
        return await userDao.getUserByEmail(email);
    }

    getUserById = async (id) => {
        try {
            const user = await userDao.getUserById(id);
            if (!user) return false;
            else return user;
        } catch (error) {
            console.log(error);
        }
    }

    #generateTokenService(user) {
        try {

            const payload = {
                userId: user._id,
            };

            const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
            return token;
        }
        catch (error) {
            console.log(error);
        }
    }

    async register(user) {
        try {
            return await userDao.register(user);
        } catch (error) {
            console.log(error);
        }
    }

    async login(user) {
        try {
            const userExists = await userDao.login(user);
            //console.log("userExists ", userExists);
            if (userExists) {
                const token = this.#generateTokenService(userExists);
                //console.log("Token ", token);
                return token;
            }
            else return false;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserDTO(id) {
        try {
            const user = await userRepository.getUserDTO(id);
            if (!user) return false;
            else return user;
        } catch (error) {
            console.log(error);
        }
    }

}



/*import { UserManagerMondoDB } from "../daos/mongodb/userManagerMongodb.js";
const userDao = new UserManagerMondoDB();

//export default class UserServices {

export const findByEmail = async (email) => {
    return await userDao.getUserByEmail(email);
}


export const register = async (user) => {
    try {
        const { email } = user;
        const exists = await userDao.getUserByEmail(email);
        if (!exists) return await userDao.register(user);
        else return false;
    } catch (error) {
        console.log(error);
    }
}

export const login = async (email, password) => {
    try {
        const user = { email, password };
        const userExists = await userDao.login(user);
        if (!userExists) return false;
        else return userExists;
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (id) => {
    try {
        const response = await userDao.getUserById(id);
        if (response) return response;
        else return false;
    } catch (error) {
        console.log(error);
    }
}*/