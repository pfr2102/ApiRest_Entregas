import { Router } from "express";
import * as shippingsController from '../controllers/shipping.controller';

const router = Router();

router.get('/', shippingsController.getShippingsAll);
router.post('/', shippingsController.addShippings);
router.put('/:id', shippingsController.updateShipping);
router.delete('/deleteByValue/:valueToDelete', shippingsController.deleteShippingByValue);

export default router;  