import { createHash, isValidPass } from '../../../../utils.js';
import MongoDao from "../mongoDao.js";
import { UserModel } from "./userModel.js";

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    }

    async getUserByEmail(email) {
        try {
            const response = await this.model.findOne({ email: email }).lean();
            if (response) {
                return response;
            } else return false;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id) {
        try {
            const response = await this.model.findById(id).lean();
            if (response) return response;
            else return false;
        } catch (error) {
            console.log(error);
        }
    }


    async register(user) {
        try {
            const { email, password } = user;
            const existsUser = await this.getUserByEmail(email);//.lean();
            if (!existsUser) {
                if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                    return this.model.create({ ...user, password: createHash(password), role: "admin" });
                }
                return this.model.create({ ...user, password: createHash(password) });
            } else return false;
        } catch (error) {
            console.log(error);
        }
    }


    async login(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getUserByEmail(email);//.lean();
            console.log(userExist);
            if (userExist) {
                const isValid = isValidPass(password, userExist)
                if (!isValid) return false;
                else return userExist;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }
}


/*
 async getUserById(id) {
        try {
            const response = await UserModel.findById(id).lean();
            if (response) return response;
            else return false;
        } catch (error) {
            console.log(error);
        }
    }
    */