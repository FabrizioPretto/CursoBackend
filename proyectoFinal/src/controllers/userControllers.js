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
            const { first_name, last_name, email, age, password } = req.body;
            const user = { first_name, last_name, email, age, password };
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
            console.log("user controller:::", token);
            if (!token) return httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN); //createResponse(res, 404, 'Error login/generate token');
            else {
                //const access_token = generateToken(user);
                return httpResponse.Ok(res, token);
                //res.header('Authorization', token).json({ msg: "Login Ok", token });
                //createResponse(res, 200, token);
            }
        } catch (error) {
            next(error.message);
        }
    }


    //Actualizar
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