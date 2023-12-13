import { Router } from "express";
import * as shippingsController from '../controllers/entregas.controller';

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
router.get('/one/envio', shippingsController.GetOneEnvio);

//RUTAS PARA SUBDOCUMENTO INFO_AD================================================================================================
router.post('/subdocument', shippingsController.AddInfoAd); //Para hacer un post con id para los subdocumentos (el id se requiere para)
                                                                  //en que documento vas a colocar el nuevo subdocumento
router.put('/subdocument', shippingsController.UpdateInfoAd);
router.delete('/subdocument', shippingsController.DeleteInfoAd);
//FIN RUTAS INFO_AD===============================================================================================================

//RUTAS PARA SUBDOCUMENTO ENVIOS================================================================================================
router.post('/subdocumentE', shippingsController.AddEnvios);
router.put('/subdocumentE', shippingsController.UpdateEnvios);
router.delete('/subdocumentE', shippingsController.DeleteEnvios);
//FIN RUTAS ENVIOS===============================================================================================================

//RUTAS PARA SUBDOCUMENTO INFO_AD DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentEInf', shippingsController.AddEnviosInfoAd);
router.put('/subdocumentEInf', shippingsController.UpdateEnviosInfoAd);
router.delete('/subdocumentEInf', shippingsController.DeleteEnviosInfoAd);
//FIN RUTAS INFO_AD DE ENVIOS==========================================================================================================

//RUTAS PARA SUBDOCUMENTO PRODUCTOS DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentEPr', shippingsController.AddProductos);
router.put('/subdocumentEPr', shippingsController.UpdateProductos);
router.delete('/subdocumentEPr', shippingsController.DeleteProductos);
//FIN RUTAS PRODUCTOS DE ENVIOS==========================================================================================================

//RUTAS PARA SUBDOCUMENTO ESTATUS DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentESt', shippingsController.AddEstatus);
//FIN RUTAS ESTATUS DE ENVIOS==========================================================================================================

//RUTAS PARA SUBDOCUMENTO RASTREOS DE SUBDOCUMENTO ENVIOS==============================================================================
router.post('/subdocumentERa', shippingsController.AddRastreos);
//FIN RUTAS RASTREOS DE ENVIOS==========================================================================================================

//RUTAS PARA SUBDOCUMENTO SEGUIMIENTO DE SUBDOCUMENTO RASTREOS DE SUBDOCUMENTO ENVIOS===================================================
router.post('/subdocumentESe', shippingsController.AddSeguimiento);
router.put('/subdocumentESe', shippingsController.UpdateSeguimiento);
router.delete('/subdocumentESe', shippingsController.DeleteSeguimiento);
//FIN RUTAS SEGUIMIENTO DE SUBDOCUMENTO RASTREIS DE SUBDOCUMENTO ENVIOS=================================================================

export default router;  