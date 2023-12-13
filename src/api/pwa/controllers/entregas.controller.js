import * as shippingServices from '../services/entregas.service';

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
  
      const result = await shippingServices.GetOneSubdocsrv(IdInstitutoOK, IdNegocioOK, IdEntregaOK, subdocument);
  
      if (result) {
        return res.status(result.status).json(result);
      }
    } catch (error) {
      next(error);
    }
};

//PARA HACER UN GET A UNO DE LOS OBJETOS DEL ARREGLO DE ENVIOS MEDIANTE EL IdDomicilioOK
export const GetOneEnvio = async (req, res, next) => {
    try {
      const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdDomicilioOK } = req.query;
      const shippingData = await shippingServices.GetOneEnviosrv(
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
export const AddInfoAd = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newShipping = {
            //El operador de propagación (...) se utiliza para extraer todas las propiedades de req.body y 
            //colocarlas en el nuevo objeto newShipping. Esto es equivalente a copiar todas las propiedades 
            //de req.body en el nuevo objeto. (Igual para queryParams)
            ...req.body,
            ...queryParams
        };

        const shippingsAdded = await shippingServices.AddInfoAdsrv(newShipping, queryParams);

        if (shippingsAdded) {
            return res.status(shippingsAdded.status).json(shippingsAdded);
        }
    } catch (error) {
        next(error);
    }
};

//PUT
export const UpdateInfoAd = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK } = req.query; // Obtén los valores de los query parameters
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await shippingServices.UpdateInfoAdsrv(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK, newData);

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
export const DeleteInfoAd = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK } = req.query; // Obtén los valores de los query parameters

        // Llama al servicio de eliminación y pasa los valores a eliminar
        const result = await shippingServices.DeleteInfoAdsrv(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK);

        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC INFO_AD=============================================

//=============================================PARA SUBDOC ENVIOS=============================================
//POST
export const AddEnvios = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newShipping = {
            ...req.body,
            ...queryParams
        };

        const shippingsAdded = await shippingServices.AddEnviossrv(newShipping, queryParams);

        if (shippingsAdded) {
            return res.status(shippingsAdded.status).json(shippingsAdded);
        }
    } catch (error) {
        next(error);
    }
};

//PUT
export const UpdateEnvios = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdDomicilioOK } = req.query; // Obtén los valores de los query parameters
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await shippingServices.UpdateEnviossrv(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdDomicilioOK, newData);

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
export const DeleteEnvios = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK } = req.query; // Obtén los valores de los query parameters

        // Llama al servicio de eliminación y pasa los valores a eliminar
        const result = await shippingServices.DeleteEnviossrv(IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK);

        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC ENVIOS=============================================

//=============================================PARA SUBDOC INFO_AD DE SUBDOC ENVIOS=============================================
export const AddEnviosInfoAd = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newInfoAd = {
            ...req.body,
            ...queryParams
        };

        const enviosinfadAdded = await shippingServices.AddEnviosInfoAdsrv(newInfoAd, queryParams);

        if (enviosinfadAdded) {
            return res.status(enviosinfadAdded.status).json(enviosinfadAdded);
        }
    } catch (error) {
        next(error);
    }
};

export const UpdateEnviosInfoAd = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const updatedInfoAd = {
            ...req.body,
            ...queryParams
        };

        const enviosinfadUpdated = await shippingServices.UpdateEnviosInfoAdsrv(updatedInfoAd, queryParams);

        if (enviosinfadUpdated) {
            return res.status(enviosinfadUpdated.status).json(enviosinfadUpdated);
        }
    } catch (error) {
        next(error);
    }
};

export const DeleteEnviosInfoAd = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        const enviosinfadDeleted = await shippingServices.DeleteEnviosInfoAdsrv(queryParams);

        if (enviosinfadDeleted) {
            return res.status(enviosinfadDeleted.status).json(enviosinfadDeleted);
        }
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC INFO_AD DE SUBDOC ENVIOS=============================================


//=============================================PARA SUBDOC PRODUCTOS DE SUBDOC ENVIOS=============================================
export const AddProductos = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newInfoAd = {
            ...req.body,
            ...queryParams
        };

        const productosAdded = await shippingServices.AddProductossrv(newInfoAd, queryParams);

        if (productosAdded) {
            return res.status(productosAdded.status).json(productosAdded);
        }
    } catch (error) {
        next(error);
    }
};

export const UpdateProductos = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const updatedInfoAd = {
            ...req.body,
            ...queryParams
        };

        const productosUpdated = await shippingServices.UpdateProductossrv(updatedInfoAd, queryParams);

        if (productosUpdated) {
            return res.status(productosUpdated.status).json(productosUpdated);
        }
    } catch (error) {
        next(error);
    }
};

export const DeleteProductos = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        const productosDeleted = await shippingServices.DeleteProductossrv(queryParams);

        if (productosDeleted) {
            return res.status(productosDeleted.status).json(productosDeleted);
        }
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC PRODUCTOS DE SUBDOC ENVIOS=============================================

//=============================================PARA SUBDOC ESTATUS DE SUBDOC ENVIOS=============================================
export const AddEstatus = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newInfoAd = {
            ...req.body,
            ...queryParams
        };
        console.log("DATOS", queryParams, req.body);

        const estatusAdded = await shippingServices.AddEstatussrv(newInfoAd, queryParams);

        if (estatusAdded) {
            return res.status(estatusAdded.status).json(estatusAdded);
        }
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC ESTATUS DE SUBDOC ENVIOS=============================================


//=============================================PARA SUBDOC RASTREOS DE SUBDOC ENVIOS=============================================
export const AddRastreos = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newInfoAd = {
            ...req.body,
            ...queryParams
        };

        const rastreosAdded = await shippingServices.AddRastreossrv(newInfoAd, queryParams);

        if (rastreosAdded) {
            return res.status(rastreosAdded.status).json(rastreosAdded);
        }
    } catch (error) {
        next(error);
    }
};
//=============================================FIN PARA SUBDOC RASTREOS DE SUBDOC ENVIOS=============================================

//=============================================PARA SUBDOC SEGUIMIENTO DE SUBDOC RASTREOS DE SUBDOC ENVIOS===========================
export const AddSeguimiento = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newInfoAd = {
            ...req.body,
            ...queryParams
        };

        const seguimientoAdded = await shippingServices.AddSeguimientosrv(newInfoAd, queryParams);

        if (seguimientoAdded) {
            return res.status(seguimientoAdded.status).json(seguimientoAdded);
        }
    } catch (error) {
        next(error);
    }
};

export const UpdateSeguimiento = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        // Incorporar query parameters a los datos de envío
        const newInfoAd = {
            ...req.body,
            ...queryParams
        };

        const seguimientoAdded = await shippingServices.UpdateSeguimientosrv(newInfoAd, queryParams);

        if (seguimientoAdded) {
            return res.status(seguimientoAdded.status).json(seguimientoAdded);
        }
    } catch (error) {
        next(error);
    }
};


export const DeleteSeguimiento = async (req, res, next) => {
    try {
        const queryParams = req.query; // Obtener los query parameters

        const seguimientoDeleted = await shippingServices.DeleteSeguimientosrv(queryParams);

        if (seguimientoDeleted) {
            return res.status(seguimientoDeleted.status).json(seguimientoDeleted);
        }
    } catch (error) {
        next(error);
    }
}