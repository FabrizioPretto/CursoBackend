import * as service from "../services/userServices.js";
import { ProductManagerMongoDB } from "../daos/mongodb/productMongodbManager.js";
const productsDao = new ProductManagerMongoDB();
import { UserManagerMondoDB } from "../daos/mongodb/userManagerMongodb.js";
const userDao = new UserManagerMondoDB();

export const register = async (req, res, next) => {
    try {
        const user = await service.register(req.body);
        if (user) { res.redirect('/views'); }
        else res.redirect('/views/register-error');
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
            res.render('realTimeProducts', { flag, info, products });
        }
        else res.redirect('/views/error-login');
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
                res.redirect('/views');
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
        /* res.json({
             msg: "Register/Login Github ok",
             session: req.session,
             user: {
                 first_name,
                 email,
                 isGithub
             }
         })*/
        let products = await productsDao.getAllProducts();
        res.render('realTimeProducts', { info, products });

    } catch (error) {
        next(error.message)
    }
}
