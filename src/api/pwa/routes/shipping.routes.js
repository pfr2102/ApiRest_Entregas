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

//RUTAS PARA SUBDOCUMENTO PRODUCTOS DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentEPr', shippingsController.addShippingsSubEnviosPr);
router.put('/subdocumentEPr', shippingsController.UpdateSubdocumentEnviosPr);
router.delete('/subdocumentEPr', shippingsController.DeleteSubdocumentEnviosPr);
//FIN RUTAS PRODUCTOS DE ENVIOS==========================================================================================================

//RUTAS PARA SUBDOCUMENTO ESTATUS DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentESt', shippingsController.addShippingsSubEnviosSt);
//FIN RUTAS ESTATUS DE ENVIOS==========================================================================================================

//RUTAS PARA SUBDOCUMENTO RASTREOS DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentERa', shippingsController.addShippingsSubEnviosRa);
//FIN RUTAS RASTREOS DE ENVIOS==========================================================================================================

//RUTAS PARA SUBDOCUMENTO SEGUIMIENTO DE SUBDOCUMENTO RASTREIS DE SUBDOCUMENTO ENVIOS===================================================
router.post('/subdocumentESe', shippingsController.addShippingsSubEnviosSe);
router.put('/subdocumentESe', shippingsController.UpdateSubdocumentEnviosSe);
router.delete('/subdocumentESe', shippingsController.DeleteSubdocumentEnviosSe);
//FIN RUTAS SEGUIMIENTO DE SUBDOCUMENTO RASTREIS DE SUBDOCUMENTO ENVIOS=================================================================

export default router;  