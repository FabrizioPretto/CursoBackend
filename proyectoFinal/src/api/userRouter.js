import { Router } from "express";
const router = Router();
import * as controller from '../controllers/userControllers.js'
import passport from "passport";

router.post('/register', passport.authenticate('signup'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);

//router.get('/private', isAuth, (req, res) => res.send('route private'));

router.get(
    '/register-github',
    passport.authenticate('github', { scope: ["user:email"] })
)

router.get(
    '/github',
    passport.authenticate('github', { scope: ["user:email"] }),
    controller.githubResponse);


export default router;

