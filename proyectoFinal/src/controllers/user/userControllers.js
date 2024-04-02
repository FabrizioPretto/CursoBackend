import Controllers from "../classControllers.js";
import UserServices from "../../services/user/userServices.js";
const userServices = new UserServices();
import ProductService from "../../services/products/productServices.js";
const productServices = new ProductService();
import { HttpResponse, errorsDictionary } from "../../utils/httpResponse.js";
const httpResponse = new HttpResponse();



export default class UserController extends Controllers {
    constructor() {
        super(userServices);
    }

    register = async (req, res, next) => {
        try {
            const { first_name, last_name, email, age, role, password } = req.body;
            const user = { first_name, last_name, email, age, role, password };
            const newUser = await userServices.register(user);
            if (!newUser) return httpResponse.Forbidden(res, errorsDictionary.ERROR_USER_EXISTS);
            else return httpResponse.Ok(res, newUser);
        } catch (error) {
            next(error.message);
        }
    }

    login = async (req, res, next) => {
        try {

            const token = await userServices.login(req.body);
            const { email } = req.body;
            let user_id = await userServices.getUserByEmail(email);
            if (!user_id) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
            else await userServices.updateLastConnection(user_id);
            if (!token) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
            else {
                res.cookie('token', token, { httpOnly: true });
                return httpResponse.Ok(res, token);
            }
        } catch (error) {
            next(error.message);
        }
    }


    getUsersDto = async (req, res, next) => {
        try {
            const info = await userServices.getUsersDTO();
            if (!info) return httpResponse.Forbidden(res, errorsDictionary.ERROR_USER_EXISTS);
            else return httpResponse.Ok(res, info);
        } catch (error) {
            next(error.message);
        }
    }

    deleteUsers = async (req, res, next) => {
        try {
            const response = await userServices.deleteUsers();
            if (!response) return httpResponse.NotFound(res, errorsDictionary.ERROR_USERS);
            else return httpResponse.Ok(res, response);
        } catch (error) {
            next(error.message);
        }
    }


    profile = async (req, res, next) => {
        try {
            const { first_name, last_name, email, role } = req.user;
            return httpResponse.Ok(res, { first_name, last_name, email, role })
        } catch (error) {
            next(error.message);
        }
    };

}

