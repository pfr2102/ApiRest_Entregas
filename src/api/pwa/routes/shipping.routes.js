import { Router } from "express";
import * as shippingsController from '../controllers/shipping.controller';

const router = Router();

router.get('/', shippingsController.getShippingsAll);

    //26/10/2023 - Sepa la verga que diferencia haya, funciona sin esto en postman y por medio de params
//params: ['IdInstitutoOK', 'IdEtiquetaOK']
//router.get('/one', shippingsController.getShippingsOne);

router.get('/:id', shippingsController.getShippingByIdController);
router.post('/', shippingsController.addShippings);
router.put('/:id', shippingsController.updateShipping);

    //26/10/2023 - Sepa la verga que diferencia haya, funciona sin esto en postman y por medio de params
//params: ['IdInstitutoOK', 'IdEtiquetaOK']
//router.put('/', shippingsController.updateShipping);

router.delete('/:id', shippingsController.deleteShippingByValue);

export default router;  