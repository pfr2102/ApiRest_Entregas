import { Router } from "express";
import * as entregasController from '../controllers/institutes.controller';

const router = Router();

router.get('/', entregasController.getEntregasAll);
router.post('/', entregasController.addEntregas);
router.put('/:id', entregasController.updateEntrega);
router.delete('/deleteByValue/:valueToDelete', entregasController.deleteEntregaByValue);

export default router;  