import Controllers from "./classControllers.js";
import UserServices from "../services/userServices.js";
const userServices = new UserServices();
import ProductService from "../services/productServices.js";
const productServices = new ProductService();
import { createResponse } from "../utils/utils.js";
import { generateToken } from "../jwt/auth.js";
import { HttpResponse, errorsDictionary } from "../utils/httpResponse.js";
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
            if (!newUser) return httpResponse.Forbidden(res, errorsDictionary.ERROR_USER_EXISTS); //createResponse(res, 404, 'User already exists');
            else return httpResponse.Ok(res, newUser);
        } catch (error) {
            next(error.message);
        }
    }

    login = async (req, res, next) => {
        try {
            //const { email, password } = req.body;
            const token = await userServices.login(req.body);
            const { email } = req.body;
            let user_id = await userServices.getUserByEmail(email);
            if (!user_id) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
            else await userServices.updateLastConnection(user_id);
            if (!token) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN); //createResponse(res, 404, 'Error login/generate token');
            else {
                //const access_token = generateToken(user);
                res.cookie('token', token, { httpOnly: true });
                return httpResponse.Ok(res, token);
                //res.header('Authorization', token).json({ msg: "Login Ok", token });
                //createResponse(res, 200, token);
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

    //Actualizar no funciona
    profile = async (req, res, next) => {
        try {
            const info = await userServices.getUserDTO(req.session.passport.user) //userServices.getById(req.session.passport.user);
            res.render('profile', { info })
        } catch (error) {
            next(error.message);
        }
    };


    registerResponse = async (req, res, next) => {
        try {
            res.json({
                msg: 'register Ok',
                session: req.session
            })
        } catch (error) {
            next(error.message)
        }
    }

    loginResponse = async (req, res, next) => {
        try {
            const info = await userServices.getById(req.session.passport.user);
            let products = await productServices.getAll();
            res.render('realTimeProducts', { info, products });

        } catch (error) {
            next(error.message)
        }
    }

    resetPassword = async (req, res, next) => {
        try {
            const user = req.user;
            const tokenResetPassword = await userServices.resetPassword(user);
            console.log("tokenPass: ", tokenResetPassword);
            if (tokenResetPassword) {
                res.cookie("tokenPass", tokenResetPassword);

                return httpResponse.Ok(res, { msg: "Reset email was sent" });
            }
            else return httpResponse.NotFound(res, "Email not sent");
        } catch (error) {
            next(error);
        }
    }

    async updatePassword(req, res, next) {
        try {
            const user = req.user;
            const { password } = req.body;
            const { tokenPass } = req.cookies;
            console.log("El token desde Controller: ", tokenPass);
            if (!tokenPass) return httpResponse.Forbidden(res, errorsDictionary.ERROR_TOKEN);
            const updatedPass = await userServices.updatePassword(password, user);
            if (updatedPass) return httpResponse.NotFound(res, errorsDictionary.ERROR_PASSWORD);
            res.clearCookie("tokenPass");
        } catch (error) {
            next(error.message);
        }
    }

    logout = async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (!err) {
                    res.redirect('/');
                } else {
                    res.send({ status: "Logout Error" });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    githubResponse = async (req, res, next) => {
        try {
            console.log(req.user);
            const { first_name, email, isGithub } = req.user;
            const info = await userServices.getUserByEmail(email);
            console.log(info);
            //res.json({msg: "Register/Login Github ok",session: req.session,user: {first_name,email,isGithub}})
            let products = await productServices.getAll();
            res.render('realTimeProducts', { info, products });

        } catch (error) {
            next(error.message)
        }
    }


    googleResponse = async (req, res, next) => {
        try {
            console.log(req.user);
            const { first_name, last_name, email, isGoogle } = req.user;
            const info = await userServices.getUserByEmail(email);
            console.log(info);
            //res.json({msg: "Register/Login Google ok",session: req.session,user: { first_name, last_name, email, isGoogle }})
            let products = await productServices.getAll();
            res.render('realTimeProducts', { info, products });

        } catch (error) {
            next(error.message)
        }
    }

    loginFront = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userDao.login({ email, password });
            if (!user) res.json({ msg: 'Invalid Credentials' });
            const accessToken = generateToken(user);
            res.json(accessToken);

        } catch (error) {
            next(error);
        }
    }

}


/*import * as service from "../services/userServices.js";
import { ProductManagerMongoDB } from "../daos/mongodb/productMongodbManager.js";
const productsDao = new ProductManagerMongoDB();
import { UserManagerMondoDB } from "../daos/mongodb/userManagerMongodb.js";
import { generateToken } from "../jwt/auth.js";
const userDao = new UserManagerMondoDB();

export const register = async (req, res, next) => {
    try {
        const user = await service.register(req.body);
        if (user) { res.redirect('/register'); }
        else res.redirect('/register-error');
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await service.login(email, password);
        if (user) {
            req.session.email = email;
            req.session.first_name = user.first_name;
            req.session.last_name = user.last_name;
            req.session.role = user.role;
            const info = req.session;
            let flag = false;
            if (user.role === "admin") { flag = true; }
            let products = await productsDao.getAllProducts();
            const accessToken = generateToken(user);
            res.header('Authorization', accessToken).json({ msg: 'Login Ok', accessToken })
            res.render('realTimeProducts', { flag, info, products });
        }
        else res.redirect('/error-login');
    } catch (error) {
        console.log(error);
    }
}

export const profile = async (req, res, next) => {
    try {
        const info = await service.getUserById(req.session.passport.user);
        res.render('profile', { info })
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (!err) {
                res.redirect('/');
            } else {
                res.send({ status: "Logout Error" });
            }
        });
    } catch (error) {
        console.log(error);
    }
}


export const registerResponse = (req, res, next) => {
    try {
        res.json({
            msg: 'register Ok',
            session: req.session
        })
    } catch (error) {
        next(error.message)
    }
}

export const loginResponse = async (req, res, next) => {
    try {
        const info = await service.getUserById(req.session.passport.user);
        let products = await productsDao.getAllProducts();
        res.render('realTimeProducts', { info, products });

    } catch (error) {
        next(error.message)
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        console.log(req.user);
        const { first_name, email, isGithub } = req.user;
        const info = await userDao.getUserByEmail(email);
        console.log(info);
        //res.json({msg: "Register/Login Github ok",session: req.session,user: {first_name,email,isGithub}})
let products = await productsDao.getAllProducts();
res.render('realTimeProducts', { info, products });

    } catch (error) {
    next(error.message)
}
}


export const googleResponse = async (req, res, next) => {
    try {
        console.log(req.user);
        const { first_name, last_name, email, isGoogle } = req.user;
        const info = await userDao.getUserByEmail(email);
        console.log(info);
        //res.json({msg: "Register/Login Google ok",session: req.session,user: { first_name, last_name, email, isGoogle }})
        let products = await productsDao.getAllProducts();
        res.render('realTimeProducts', { info, products });

    } catch (error) {
        next(error.message)
    }
}

export const loginFront = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.login({ email, password });
        if (!user) res.json({ msg: 'Invalid Credentials' });
        const accessToken = generateToken(user);
        res.json(accessToken);

    } catch (error) {
        next(error);
    }
}
*/