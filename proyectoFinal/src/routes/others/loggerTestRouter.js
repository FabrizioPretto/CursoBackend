import { Router } from "express";
import { logger } from '../../utils/logsConfig.js';

const router = Router();

router.get('/', (req, res) => {
    logger.warn("Advertencia en el endpoint de prueba");
    logger.error("Error en el endpoint de prueba");
    res.send("Probando logger");
});

export default router;