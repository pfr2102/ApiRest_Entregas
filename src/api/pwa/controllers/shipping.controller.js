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












//********************************************SUBDOCUMENTOS****************************************** */
//GET EN GENERAL (funciona mandandole el nombre del subdocumento como parametro)
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

//PARA HACER UN GET A UNO DE LOS OBJETOS DEL ARREGLO DE ENVIOS MEDIANTE EL IdDomicilioOK
export const GetOneShippingEnvio = async (req, res, next) => {
    try {
      const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdDomicilioOK } = req.query;
      const shippingData = await shippingServices.getShippingMethod(
        IdInstitutoOK,
        IdNegocioOK,
        IdEntregaOK,
        IdDomicilioOK
      );
  
      if (shippingData) {
        shippingData.session = null;
        return res.status(shippingData.status).json(shippingData);
      }
    } catch (error) {
      next(error);
    }
};


//=============================================PARA SUBDOC INFO_AD=============================================
//POST
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

//PUT
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

//DELETE
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
//=============================================FIN PARA SUBDOC INFO_AD=============================================

//=============================================PARA SUBDOC ENVIOS=============================================
//POST
export const addShippingsSubEnvios = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newShipping = {
            ...req.body,
            ...queryParams
        };

        const shippingsAdded = await shippingServices.addShippingsSubEnvios(newShipping, queryParams);

        if (shippingsAdded) {
            return res.status(shippingsAdded.status).json(shippingsAdded);
        }
    } catch (error) {
        next(error);
    }
};

//PUT
export const UpdateSubdocumentEnvios = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK } = req.query; // Obtén los valores de los query parameters
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await shippingServices.updateSubdocumentServiceEnvios(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK, newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};

//DELETE
export const DeleteSubdocumentEnvios = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK } = req.query; // Obtén los valores de los query parameters

        // Llama al servicio de eliminación y pasa los valores a eliminar
        const result = await shippingServices.DeleteInfoAdSubEnvios(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK);

        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC ENVIOS=============================================

//=============================================PARA SUBDOC INFO_AD DE SUBDOC ENVIOS=============================================
export const addShippingsSubEnviosInf = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newInfoAd = {
            ...req.body,
            ...queryParams
        };

        const shippingsAdded = await shippingServices.addShippingsSubEnviosInf(newInfoAd, queryParams);

        if (shippingsAdded) {
            return res.status(shippingsAdded.status).json(shippingsAdded);
        }
    } catch (error) {
        next(error);
    }
};

export const UpdateSubdocumentEnviosInf = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const updatedInfoAd = {
            ...req.body,
            ...queryParams
        };

        const shippingsUpdated = await shippingServices.updateShippingsSubEnviosInf(updatedInfoAd, queryParams);

        if (shippingsUpdated) {
            return res.status(shippingsUpdated.status).json(shippingsUpdated);
        }
    } catch (error) {
        next(error);
    }
};

export const DeleteSubdocumentEnviosInf = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        const shippingsDeleted = await shippingServices.deleteShippingsSubEnviosInf(queryParams);

        if (shippingsDeleted) {
            return res.status(shippingsDeleted.status).json(shippingsDeleted);
        }
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC INFO_AD DE SUBDOC ENVIOS=============================================













  