import { Router } from "express";
import * as shippingsController from '../controllers/shipping.controller';

const router = Router();

router.get('/', shippingsController.GetAllShippings);
router.get('/one', shippingsController.GetOneShipping);
router.post('/', shippingsController.AddOneShipping);
router.put('/', shippingsController.UpdateOneShipping);
router.delete('/', shippingsController.DeleteOneShipping);
router.patch('/one', shippingsController.UpdatePatchOneShipping);

//GET PARA SUBDOCS EN GENERAL
router.get('/subdocument', shippingsController.GetOneSubdoc);

//RUTAS PARA SUBDOCUMENTO INFO_AD
router.post('/subdocument', shippingsController.addShippingsSub); //Para hacer un post con id para los subdocumentos (el id se requiere para)
                                                                  //en que documento vas a colocar el nuevo subdocumento
router.put('/subdocument', shippingsController.UpdateSubdocument);
router.delete('/subdocument', shippingsController.DeleteSubdocument);



export default router;  