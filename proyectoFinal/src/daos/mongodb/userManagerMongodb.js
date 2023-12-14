import { createHash, isValidPass } from "../../utils.js";
import { UserModel } from "./models/userModel.js";

export class UserManagerMondoDB {

    async getUserByEmail(email) {
        try {
            const response = await UserModel.findOne({ email: email });
            if (response) {
                return response;
            } else return false;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id) {
        try {
            const response = await UserModel.findById(id).lean();
            if (response) return response;
            else return false;
        } catch (error) {
            console.log(error);
        }
    }


    async register(user) {
        try {
            const { email, password } = user;
            const existsUser = await UserModel.findOne({ email }).lean();
            if (!existsUser) {
                if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                    return await UserModel.create({ ...user, password: createHash(password), role: "admin" });
                }
                return await UserModel.create({ ...user, password: createHash(password) });
            } else return false;
        } catch (error) {
            console.log(error);
        }
    }


    async login(user) {
        try {
            const { email, password } = user;
            const userExist = await UserModel.findOne({ email });

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