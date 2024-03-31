import { createHash, isValidPass } from '../../../../utils/utils.js';
import MongoDao from "../mongoDao.js";
import { UserModel } from "./userModel.js";
import { generateToken } from '../../../../jwt/auth.js';


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



    async resetPassword(user) {
        try {
            const { email } = user;
            const userExist = await this.getUserByEmail(email);
            if (userExist) return generateToken(userExist, "1h");
            else return false;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePassword(password, user) {
        try {
            const isEqual = isValidPass(password, user);
            if (isEqual) return false;
            else {
                const newPass = createHash(password);
                return await this.update(user._id, { password: newPass });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateLastConnection(user_id) {
        try {
            await this.model.findByIdAndUpdate(user_id, { last_connection: new Date() });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteUsers() {
        try {
            const usersToDelete = [];
            let dateToCompare = new Date();
            const usersArray = await this.getAll();
            usersArray.map((user) => {
                let dif = dateToCompare - user.last_connection;
                dif = Math.floor(dif / (1000 * 60 * 60 * 24));
                if (dif > 2) usersToDelete.push(user);
            })
            await this.model.deleteMany({ _id: { $in: usersToDelete.map((user) => user._id) } });
            return usersToDelete;
        } catch (error) {
            throw new Error(error.message);
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