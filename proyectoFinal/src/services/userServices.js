import Services from "./classServices.js";
import persistence from "../persistence/daos/persistence.js";
const { userDao } = persistence;
import { generateToken } from '../jwt/auth.js';

export default class UserServices extends Services {
    constructor() {
        super(userDao);
    }

    getUserByEmail = async (email) => {
        return await userDao.getUserByEmail(email);
    }

    #generateTokenService = async (user) => {
        try {
            return generateToken(user);
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
            if (userExists) return this.#generateTokenService(user);
            else return false;
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