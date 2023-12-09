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
//PARA HACER UN GET A UNO DE LOS OBJETOS DEL ARREGLO DE ENVIOS MEDIANTE EL IdDomicilioOK
router.get('/one/envio', shippingsController.GetOneShippingEnvio);

//RUTAS PARA SUBDOCUMENTO INFO_AD================================================================================================
router.post('/subdocument', shippingsController.addShippingsSub); //Para hacer un post con id para los subdocumentos (el id se requiere para)
                                                                  //en que documento vas a colocar el nuevo subdocumento
router.put('/subdocument', shippingsController.UpdateSubdocument);
router.delete('/subdocument', shippingsController.DeleteSubdocument);
//FIN RUTAS INFO_AD===============================================================================================================

//RUTAS PARA SUBDOCUMENTO ENVIOS================================================================================================
router.post('/subdocumentE', shippingsController.addShippingsSubEnvios);
router.put('/subdocumentE', shippingsController.UpdateSubdocumentEnvios);
router.delete('/subdocumentE', shippingsController.DeleteSubdocumentEnvios);
//FIN RUTAS ENVIOS===============================================================================================================

//RUTAS PARA SUBDOCUMENTO INFO_AD DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentEInf', shippingsController.addShippingsSubEnviosInf);
router.put('/subdocumentEInf', shippingsController.UpdateSubdocumentEnviosInf);
router.delete('/subdocumentEInf', shippingsController.DeleteSubdocumentEnviosInf);
//FIN RUTAS INFO_AD DE ENVIOS==========================================================================================================

export default router;  