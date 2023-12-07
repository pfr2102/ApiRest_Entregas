import * as shippingServices from '../services/shipping.service';

//*************************************************************************************************** */
// GET
export const GetAllShippings = async(req, res, next) => {
    try{
        const shippingsAll = await shippingServices.getShippingsAll();
        
        if(shippingsAll) {
            return res.status(shippingsAll.status).json(shippingsAll);
        }
    }catch(error){
        next(error);
    }
};

export const GetOneShipping = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK } = req.query; // Obtén los valores de los query parameters

        // Llamar a la función para buscar y pasa los valores
        const result = await shippingServices.getShippingByIdService(IdEntregaOK, IdInstitutoOK, IdNegocioOK);

        if (result) {
            return res.status(result.status).json(result);
        }
    } catch (error) {
        next(error);
    }
};

export const GetOneSubdoc = async (req, res, next) => {
    try {
      const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, subdocument } = req.query;
  
      const result = await shippingServices.getSubdocumentById(IdInstitutoOK, IdNegocioOK, IdEntregaOK, subdocument);
  
      if (result) {
        return res.status(result.status).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
// FIN GET
//*************************************************************************************************** */
//*************************************************************************************************** */
// POST

export const AddOneShipping = async(req, res, next) => {
    try{
        const shippingsAdded = await shippingServices.addShippings(req.body);
        
        if(shippingsAdded) {
            return res.status(shippingsAdded.status).json(shippingsAdded);
        }
    }catch(error){
        next(error);
    }
};

//PARA POST DE ID E INSERTAR EN SUBDOCUMENTOS
export const addShippingsSub = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newShipping = {
            ...req.body,
            ...queryParams
        };

        const shippingsAdded = await shippingServices.addShippingsSub(newShipping, queryParams);

        if (shippingsAdded) {
            return res.status(shippingsAdded.status).json(shippingsAdded);
        }
    } catch (error) {
        next(error);
    }
};
// FIN POST
//*************************************************************************************************** */

//*************************************************************************************************** */
// PUT
//Feak: 
export const UpdateOneShipping = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK } = req.query; // Obtén los valores de los query parameters
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await shippingServices.updateShippingService(IdInstitutoOK, IdNegocioOK, IdEntregaOK ,newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};

export const UpdateSubdocument = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK } = req.query; // Obtén los valores de los query parameters
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await shippingServices.updateSubdocumentService(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK, newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};
// FIN PUT
//*************************************************************************************************** */

//*************************************************************************************************** */
// DELETE
//Feak: 
export const DeleteOneShipping = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK } = req.query; // Obtén los valores de los query parameters

        // Llama al servicio de eliminación y pasa los valores a eliminar
        const result = await shippingServices.deleteShippingByValueService(IdInstitutoOK, IdNegocioOK, IdEntregaOK);

        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const DeleteSubdocument = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK } = req.query; // Obtén los valores de los query parameters

        // Llama al servicio de eliminación y pasa los valores a eliminar
        const result = await shippingServices.DeleteInfoAdSub(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK);

        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};
// FIN DELETE
//*************************************************************************************************** */

//*************************************************************************************************** */
// PATCH
//Feak: 
export const UpdatePatchOneShipping = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK} = req.query;
        console.log(req.body);
        const updateData = req.body;
        const shippingUpdate = await shippingServices.updateShipping(IdInstitutoOK, IdNegocioOK, IdEntregaOK, updateData);
        if (shippingUpdate) {
            shippingUpdate.session = null;
            return res.status(shippingUpdate.status).json(shippingUpdate);
        }
    } catch (error) {
        next(error);
    }
};
// FIN PATCH
//*************************************************************************************************** */