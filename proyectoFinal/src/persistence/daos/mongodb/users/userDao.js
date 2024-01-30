import { createHash, isValidPass } from '../../../../utils.js';
import MongoDao from "../mongoDao.js";
import { UserModel } from "./userModel.js";

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    }

    async getUserByEmail(email) {
        try {
            const user = await this.model.findOne({ email })//.lean();
            if (user) {
                return user;
            } else return false;
        } catch (error) {
            console.log(error);
        }
    }



    async getUserById(id) {
        try {
            console.log("Id ", id);
            const response = await this.model.findById(id)//.lean();
            console.log("Response ", response);
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