import { Router } from "express";
const router = Router();
import UserController from "../controllers/userControllers.js";
const controller = new UserController();

router.post('/register', controller.register);

router.post('/login', controller.login);


export default router;