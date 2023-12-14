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
        console.log(user);
        if (user) {
            req.session.email = email;
            req.session.first_name = user.first_name;
            req.session.last_name = user.last_name;
            req.session.role = user.role;
            const info = req.session;
            //const role = req.sesssion.role
            console.log("pepito");
            let flag = false;
            console.log(flag);
            if (user.role === "admin") { flag = true; console.log(flag); }

            let products = await productsDao.getAllProducts();
            res.render('realTimeProducts', { flag, info, products });
        }
        else res.redirect('/views/error-login');//crear plantilla de error
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
        //const  = user;
        let products = await productsDao.getAllProducts();
        res.render('realTimeProducts', { info, products });

    } catch (error) {
        next(error.message)
    }
}