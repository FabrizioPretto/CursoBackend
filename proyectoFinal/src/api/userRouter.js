import { Router } from "express";
const router = Router();
import * as controller from '../controllers/userControllers.js'
import passport from "passport";

router.post('/register', passport.authenticate('signup'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);

export default router;

/*
router.post('/register', passport.authenticate('signup'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);
*/

/*
router.post('/register', passport.authenticate('signup'), controller.register);
router.post('/login', passport.authenticate('login'), controller.login);
*/