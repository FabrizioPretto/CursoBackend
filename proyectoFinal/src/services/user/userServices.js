import Services from "../classServices.js";
import factory from "../../persistence/daos/factory.js";
const { userDao } = factory;
import jwt from "jsonwebtoken";
import UserRepository from '../../repository/userReporistory.js';
const userRepository = new UserRepository();
import "dotenv/config";
import { sendMails } from "../others/emailServices.js";
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;


export default class UserServices extends Services {
    constructor() {
        super(userDao);
    }

    getUserByEmail = async (email) => {
        try {
            const user = await userDao.getUserByEmail(email);
            if (!user) return false;
            else return user;
        } catch (error) {
            throw new Error(error);
        }

    }

    getUserById = async (id) => {
        try {
            const user = await userDao.getUserById(id);
            if (!user) return false;
            else return user;
        } catch (error) {
            throw new Error(error);
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
            throw new Error(error);
        }
    }

    async register(user) {
        try {
            const newUser = await userDao.register(user);
            if (!newUser) throw new Error("Validation Error!");
            else return newUser;
        } catch (error) {
            throw new Error(error);
        }
    }


    async login(user) {
        try {
            const userExists = await userDao.login(user);

            if (userExists) {
                const token = this.#generateTokenService(userExists);
                return token;
            }
            else return false;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUsersDTO() {
        try {
            const info = await userRepository.getUsersDTO();
            if (!info) return false;
            else return info;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUsers() {
        try {
            const usersToDel = await userDao.deleteUsers();
            if (!usersToDel) return false;
            else {
                usersToDel.forEach(element => {
                    sendMails(element, 'inactiveUsers');
                });
            }
            return usersToDel;

        } catch (error) {
            throw new Error(error);
        }
    }

    async resetPassword(user) {
        try {
            const token = await userDao.resetPassword(user);
            if (!response) return false;
            else return response;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePassword(password, user) {
        try {
            const response = await userDao.updatePassword(password, user);
            if (!response) return false;
            else return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateLastConnection(user_id) {
        try {
            await userDao.updateLastConnection(user_id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

}


