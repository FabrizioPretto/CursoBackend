import { __dirname } from "../utils.js";
import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.render('realTimeProducts');
});


export default router;
