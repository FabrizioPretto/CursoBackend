import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    //para mostrar la vista, y le pasamos el nombre de la plantilla
    res.render('vista1')
});

router.get('/vista2', (req, res) => {
    //para mostrar la vista, y le pasamos el nombre de la plantilla
    res.render('vista2')
});

export default router;