import { Router } from "express";
import * as shippingsController from '../controllers/shipping.controller';

const router = Router();

router.get('/', shippingsController.GetAllShippings);
router.get('/one', shippingsController.GetOneShipping);
router.post('/', shippingsController.AddOneShipping);
router.put('/', shippingsController.UpdateOneShipping);
router.delete('/', shippingsController.DeleteOneShipping);
router.patch('/', shippingsController.UpdatePatchOneShipping);


//RUTAS PARA SUBDOCUMENTOS
router.post('/:id', shippingsController.addShippingsId); //Para hacer un post con id para los subdocumentos (el id se requiere para)
                                                         //en que documento vas a colocar el nuevo subdocumento
router.put('/:id/:subdocumentId', shippingsController.updateShippingsId);


export default router;  