import { Router } from "express";
import { checkToken } from '../middlewares/checkToken.js';
import UserController from '../controllers/userControllers.js';
const controller = new UserController();
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/register', passport.authenticate('signup'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);
router.get('/profile', checkToken, controller.profile);


router.get('/private', checkToken, (req, res) => {
    const { first_name, last_name, email, role } = req.user;
    res.json({
        status: "success",
        userData: {
            first_name,
            last_name,
            email,
            role
        }
    })
});

router.get(
    '/register-github',
    passport.authenticate('github', { scope: ["user:email"] })
)

router.get(
    '/github',
    passport.authenticate('github', { scope: ["user:email"] }),
    controller.githubResponse);

router.get(
    '/oauth2/redirect/accounts.google.com',
    passport.authenticate('google', { assignProperty: "user" }),
    controller.googleResponse);

router.post('/loginfront', controller.loginFront)

export default router;
/*
import { Router } from "express";
const router = Router();
import * as controller from '../controllers/userControllers.js'
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkToken } from "../middlewares/checkToken.js";

router.post('/register', passport.authenticate('signup'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);

router.get('/private', checkToken, (req, res) => {
    const { first_name, last_name, email, role } = req.user;
    res.json({
        status: "success",
        userData: {
            first_name,
            last_name,
            email,
            role
        }
    })
});

router.get(
    '/register-github',
    passport.authenticate('github', { scope: ["user:email"] })
)

router.get(
    '/github',
    passport.authenticate('github', { scope: ["user:email"] }),
    controller.githubResponse);

router.get(
    '/oauth2/redirect/accounts.google.com',
    passport.authenticate('google', { assignProperty: "user" }),
    controller.googleResponse);

router.post('/loginfront', controller.loginFront)

//PROFE router.get('/github', passport.authenticate('github', {failureRedirect: '/login',successRedirect: '/profile',passReqToCallback: true}))


export default router;

*/