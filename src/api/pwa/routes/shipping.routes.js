import { Router } from "express";
import * as shippingsController from '../controllers/shipping.controller';

const router = Router();

router.get('/', shippingsController.getShippingsAll);
router.get('/:id', shippingsController.getShippingByIdController);
router.post('/', shippingsController.addShippings);
router.post('/:id', shippingsController.addShippingsId); //Para hacer un post con id para los subdocumentos
router.put('/:id', shippingsController.updateShipping);
router.delete('/:id', shippingsController.deleteShippingByValue);
router.patch('/:id', shippingsController.updateProduct);

export default router;  