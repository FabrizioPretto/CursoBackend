import { UserModel } from "./models/userModel.js";
import 'dotenv/config';
import MySqlDao from "./mysqlDao.js";
import jwt from 'jsonwebtoken';
import { createHash, isValidPass } from "../../../utils/utils.js";

const SECRET_KEY = process.env.SECRET_KEY_KWT;


export default class UserDaoMySql extends MySqlDao {
    constructor() {
        super(UserModel);
    }

    #generateToken(user) {
        const payload = {
            userId: user.id
        }
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '20m' })
    }

    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if (!existUser) {
                const newUser = this.model.create({ ...user, password: createHash(password) })
                return newUser;
                //const token = this.#generateToken(newUser);
                //return token;
            }
            else return false;
        } catch (error) {
            console.log(error);
        }
    }

    /*  async createUser(user) {
    try {
      const { email, password } = user;
      const existUser = await userModel.findOne({email});
      if(!existUser){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          const newUser = await userModel.create({...user, password: createHash(password), role: 'admin'})
          return newUser;
        } else {
          const newUser = await userModel.create({...user, password: createHash(password)})
          return newUser;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }*/



    async login(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if (existUser) {
                const passValid = isValidPass(password, existUser);
                if (!passValid) return false;
                else return this.#generateToken(existUser);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({ where: { email: email } })
            if (!userExist) return false;
            else return userExist;
        } catch (error) {
            console.log(error);
        }
    }
}