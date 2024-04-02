import { Router } from "express";
import { checkToken } from '../../middlewares/checkToken.js';
import UserController from '../../controllers/user/userControllers.js';
const controllers = new UserController();

const router = Router();

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/getAllUsers', checkToken, controllers.getUsersDto);
router.delete('/deleteUsers', checkToken, controllers.deleteUsers);
router.get('/profile', checkToken, controllers.profile);

export default router;

