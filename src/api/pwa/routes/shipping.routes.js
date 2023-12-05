import { Router } from "express";
import * as shippingsController from '../controllers/shipping.controller';

const router = Router();

router.get('/', shippingsController.GetAllShippings);
router.get('/one', shippingsController.GetOneShipping);
router.post('/', shippingsController.AddOneShipping);
router.post('/:id', shippingsController.addShippingsId); //Para hacer un post con id para los subdocumentos
router.put('/', shippingsController.UpdateOneShipping);
router.delete('/', shippingsController.DeleteOneShipping);

export default router;  