import Shippings from '../models/entregas';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';


//===========================================================GET===========================================================S
export const getShippingsAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todas las Entregas";
        data.method = "GET";
        data.api = "/shipping";
        data.process = "Extraer todas las Entregas de la coleccción de Entregas";

        const ShippingsAll = await Shippings.find()
        .then((shippings) => {
            if(!shippings) {
                data.status = 404;
                data.messageDEV = "La base de datos <<NO>> tiene Entregas configuradas";
                throw Error(data.messageDEV);
            }

            return shippings;
        });

        data.status = 200; //200 = codigo cuando encuentras documentos
        data.messageUSR = "La extracción de las Entregas <<SI>> tuvo exito";
        data.dataRes = ShippingsAll;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La extracción de las Entregas <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}

export const getShippingByIdService = async (id, IdInstitutoOK, IdNegocioOK) => {
    let bitacora = BITACORA(); // Inicializa la bitácora
    let data = DATA(); // Inicializa los datos de la solicitud

    try {
        // Registra el proceso en la bitácora
        bitacora.process = `Obtener Entrega por ID: ${id}`;
        
        // Establece el método de la solicitud en "GET"
        data.method = "GET";
        
        // Establece la ruta de la API en "/shipping/{id}"
        data.api = `/shipping/${id}`;
        
        // Establece la descripción del proceso
        data.process = `Obtener una Entrega específica de la colección de Entregas por su ID`;

        // Busca una entrega en la base de datos por su ID
        const shipping = await Shippings.findOne({ IdEntregaOK: id, IdInstitutoOK, IdNegocioOK });

        if (!shipping) {
            // Si no se encuentra una entrega con el ID especificado, configura los datos de error
            data.status = 404;
            data.messageDEV = `No se encontró una Entrega con el ID ${id}.`;
            
            // Lanza un error con el mensaje de error
            throw Error(data.messageDEV);
        }

        // Establece los datos de éxito en la respuesta
        data.status = 200;
        data.messageUSR = "La obtención de la Entrega tuvo éxito";
        data.dataRes = shipping;

        // Agrega un mensaje de éxito a la bitácora
        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        // Devuelve una respuesta exitosa
        return OK(bitacora);

    } catch (error) {
        // Manejo de errores: Si se produce un error en el bloque "try"
        
        if (!data.status) data.status = error.statusCode; // Establece el código de estado en caso de error
        let { message } = error; // Obtiene el mensaje de error

        if (!data.messageDEV) data.messageDEV = message; // Establece el mensaje de error en los datos de la solicitud
        
        if (!data.dataRes.length === 0) data.dataRes = error; // Establece los datos de error en caso de que no se haya configurado
        
        // Establece el mensaje de error del usuario
        data.messageUSR = "La obtención de la Entrega no tuvo éxito";

        // Agrega un mensaje de fallo a la bitácora
        bitacora = AddMSG(bitacora, data, 'FAIL');

        // Devuelve una respuesta de error
        return FAIL(bitacora);
    } finally {
        // Aqui se ejecuta independientemente de si se produce un error o no
    }
};

//===========================================================FING GET===========================================================


//===========================================================POST===========================================================
export const addShippings = async(newShipping) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar una nueva Entrega";
        data.method = "POST";
        data.api = "/shipping";
        data.process = "Agregar una nueva entrega a la coleccción de Entregas";

        const shippingAdded = await Shippings.insertMany(
            newShipping,
            { order: true }
        )
        .then((shipping) => {
            if(!shipping) {
                data.status = 400; //400 de que no se pudo insertar; es diferente a 404
                data.messageDEV = "La inserción de la Entrega <<NO>> fue exitosa";
                throw Error(data.messageDEV);
            }

            return shipping;
        });

        data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
        data.messageUSR = "La inserción de la Entrega <<SI>> fue exitosa";
        data.dataRes = shippingAdded;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de la Entrega <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}

//===========================================================FIN POST===========================================================

//===========================================================PUT===========================================================
export const updateShippingService = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK,newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar la Entrega con ID ${IdEntregaOK}`;
        data.method = "PUT";
        data.api = `/shipping`;
        data.process = "Actualizar la Entrega en la colección de Entregas";

        // Actualización de la entrega
        const updatedShipping = await Shippings.findOneAndUpdate(
            { IdEntregaOK: IdEntregaOK, IdInstitutoOK: IdInstitutoOK, IdNegocioOK: IdNegocioOK },
            newData,
            { new: true } // Para devolver el documento actualizado en vez del anterior
        );

        if (!updatedShipping) {
            data.status = 404;
            data.messageDEV = `No se encontró una Entrega con el ID ${IdEntregaOK}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `La Entrega con ID ${IdEntregaOK} se actualizó con éxito`;
        data.dataRes = updatedShipping;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La actualización de la Entrega con ID ${IdEntregaOK} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

//===========================================================FIN PUT===========================================================

//===========================================================DELETE===========================================================
export const deleteShippingByValueService = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Eliminar la Entrega con Valores: ${IdInstitutoOK}, ${IdNegocioOK}, ${IdEntregaOK}`;
        data.method = "DELETE";
        data.api = `/shipping`;
        data.process = "Eliminar la Entrega en la colección de Entregas";

        // Elimina el documento basandose en los valores pasados
        const result = await Shippings.deleteOne({
            IdInstitutoOK: IdInstitutoOK,
            IdNegocioOK: IdNegocioOK,
            IdEntregaOK: IdEntregaOK
        });

        if (result.deletedCount === 0) {
            data.status = 404;
            data.messageDEV = `No se encontró una Entrega con los valores proporcionados`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "Entrega eliminada correctamente";

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminación de la Entrega falló";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

//===========================================================FIN DELETE===========================================================

//===========================================================PATCH================================================================
export const updateShipping = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK, updateData) => {
    let bitacora = BITACORA();
    let response = updateShippingMethod(bitacora,IdInstitutoOK, IdNegocioOK, IdEntregaOK,updateData);
    return response;
  };
  
  export const updateShippingMethod = async (bitacora, IdInstitutoOK, IdNegocioOK, IdEntregaOK, updateData) => {
    let data = DATA();
    try {
      bitacora.process = 'Modificar una entrega.';
      data.process = 'Modificar una entrega';
      data.method = 'PATCH';
      data.api = '/shipping';
  
      let shippingUpdated = null;
  
      // Encuentra el documento principal usando IdInstitutoOK, IdNegocioOK e IdEntregaOK
      const filter = {
        IdInstitutoOK: IdInstitutoOK,
        IdNegocioOK: IdNegocioOK,
        IdEntregaOK: IdEntregaOK
      };
  
      for (const key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          const value = updateData[key];
  
          const updateQuery = { $set: { [key]: value } };
  
          try {
            shippingUpdated = await Shippings.findOneAndUpdate(
              filter,
              updateQuery,
              { new: true }
            );
  
            if (!shippingUpdated) {
              console.error("No se encontró un documento para actualizar con ese ID,", IdEntregaOK);
              data.status = 400;
              data.messageDEV = 'La actualización de un subdocumento de entregas NO fue exitoso.';
              throw new Error(data.messageDEV);
            }
          } catch (error) {
            console.error(error);
            data.status = 400;
            data.messageDEV = 'La actualizacion de un subdocumento de entregas NO fue exitoso.';
            throw Error(data.messageDEV);
          }
        }
      }
  
      data.messageUSR = 'La modificacion de los subdocumentos de entregas SI fue exitoso.';
      data.dataRes = shippingUpdated;
      bitacora = AddMSG(bitacora, data, 'OK', 201, true);
      return OK(bitacora);
    } catch (error) {
      console.error(error);
      if (!data.status) data.status = error.statusCode;
      let { message } = error;
      if (!data.messageDEV) data.messageDEV = message;
      if (data.dataRes.length === 0) data.dataRes = error;
      data.messageUSR =
        'La Modificacionión de entregas NO fue exitoso.' +
        '\n' +
        'Any operations that already occurred as part of this transaction will be rolled back.';
      bitacora = AddMSG(bitacora, data, 'FAIL');
      return FAIL(bitacora);
    }
};
//===========================================================FIN PATCH============================================================




















//********************************************SUBDOCUMENTOS****************************************** */
//GET EN GENERAL (funciona mandandole el nombre del subdocumento como parametro)
export const GetOneSubdocsrv = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK, subdocument) => {
    let bitacora = BITACORA();
    let data = DATA();
  
    try {
      bitacora.process = `Extraer subdocumento ${subdocument} del documento con Id ${IdEntregaOK}`;
      data.method = "GET";
      data.api = `/shipping/subdocument`;
      data.process = `Extraer subdocumento ${subdocument} de la colección de Entregas`;
  
      const shipping = await Shippings.findOne({
        IdInstitutoOK: IdInstitutoOK,
        IdNegocioOK: IdNegocioOK,
        IdEntregaOK: IdEntregaOK,
      });
  
      if (!shipping) {
        data.status = 404;
        data.messageDEV = `El documento con ID ${IdEntregaOK} no fue encontrado`;
        throw Error(data.messageDEV);
      }
  
      //Se usa el punto como delimitador para "partir" subdocument = "parte1.parte2" 
      //y se obtiene parte2 que está dentro de parte1 dejando a subdocumentPath como un arreglo que contiene los 
      //datos de la ruta del subdoc
      const subdocumentPath = subdocument.split('.');
      let subdoc = shipping; //subdoc se asigna al documento principal (shipping)
  
      //for para recorrer cada dato de la ruta del subdoc
      for (const path of subdocumentPath) {
        //Si subdoc es un array se mapea para extraer las propiedades correspondientes de cada elemento.
        //Si no es un array nadamas se accede al subdoc actual
        if (Array.isArray(subdoc)) {
          subdoc = subdoc.map(item => item[path]);
        } else {
          subdoc = subdoc[path];
        }
  
        //Despues de acceder se verifica si existe, sino entonces no se puede acceder y lanza un error
        if (!subdoc) {
          data.status = 404;
          data.messageDEV = `El subdocumento ${path} no fue encontrado en el documento con Id ${IdEntregaOK}`;
          throw Error(data.messageDEV);
        }
      }
  
      data.status = 200;
      data.messageUSR = `La extracción del subdocumento ${subdocument} tuvo éxito`;
      data.dataRes = subdoc;
  
      bitacora = AddMSG(bitacora, data, 'OK', 200, true);
  
      return OK(bitacora);
    } catch (error) {
      if (!data.status) data.status = error.statusCode;
      let { message } = error;
      if (!data.messageDEV) data.messageDEV = message;
      if (!data.dataRes.length === 0) data.dataRes = error;
      data.messageUSR = `La extracción del subdocumento ${subdocument} no tuvo éxito`;
  
      bitacora = AddMSG(bitacora, data, 'FAIL');
  
      return FAIL(bitacora);
    } finally {
      // Haya o no error siempre ejecuta aquí
    }
};

//PARA HACER UN GET A UNO DE LOS OBJETOS DEL ARREGLO DE ENVIOS MEDIANTE EL IdDomicilioOK
export const GetOneEnviosrv = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdDomicilioOK) => {
    let data = DATA();
    let bitacora = BITACORA();
    try {
      bitacora.process = 'Obtener un envio.';
      data.process = 'Obtener un envio';
      data.method = 'GET';
      data.api = '/shipping';
  
      // Encuentra el documento principal usando IdInstitutoOK, IdNegocioOK e IdEntregaOK
      const filter = {
        IdInstitutoOK: IdInstitutoOK,
        IdNegocioOK: IdNegocioOK,
        IdEntregaOK: IdEntregaOK
      };
  
      try {
        const shippingData = await Shippings.findOne(filter);
  
        if (!shippingData) {
          console.error(
            'No se encontró un documento para obtener con ese ID:',
            IdEntregaOK
          );
          data.status = 404;
          data.messageDEV = 'No se encontró el documento de envio.';
          throw new Error(data.messageDEV);
        }
  
        // Encuentra el subdocumento específico dentro del array envios
        const envioEncontrado = shippingData.envios.find(
          (envio) => envio.IdDomicilioOK === IdDomicilioOK
        );
  
        if (!envioEncontrado) {
          console.error(
            'No se encontró un subdocumento de envios con IdDomicilioOK:',
            IdDomicilioOK
          );
          data.status = 404;
          data.messageDEV = 'No se encontró el subdocumento de envios.';
          throw new Error(data.messageDEV);
        }
  
        data.messageUSR = 'La obtención del subdocumento de envios fue exitosa.';
        data.dataRes = envioEncontrado;
        bitacora = AddMSG(bitacora, data, 'OK', 200, true);
        return OK(bitacora);
      } catch (error) {
        console.error(error);
        data.status = 500;
        data.messageDEV =
          'La obtención del subdocumento de envios no fue exitosa.';
        throw new Error(data.messageDEV);
      }
    } catch (error) {
      console.error(error);
      if (!data.status) data.status = error.statusCode;
      let { message } = error;
      if (!data.messageDEV) data.messageDEV = message;
      if (data.dataRes.length === 0) data.dataRes = error;
      data.messageUSR =
        'La obtención de envios no fue exitosa.' +
        '\n' +
        'Any operations that already occurred as part of this transaction will be rolled back.';
      bitacora = AddMSG(bitacora, data, 'FAIL');
      return FAIL(bitacora);
    }
};

//=============================================PARA SUBDOC INFO_AD=============================================
//POST
//POST CON ID PARA INSERTAR EN SUBDOCUMENTOS
export const AddInfoAdsrv = async (newShipping, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar una nueva info_ad";
        data.method = "POST";
        data.api = `/shipping/subdocument${queryParams}`;
        data.process = "Agregar una nueva info_ad a la colección de Entregas";

        const result = await Shippings.updateOne(
            // Usar los tres IDs como condiciones de búsqueda
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK
            }, 
            // Pasar el array (subdocumento) que es parte del documento principal
            { $push: { info_ad: newShipping } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción de la info_ad <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción de la info_ad <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de la info_ad <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

//PUT
export const UpdateInfoAdsrv = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar la info_ad con ID ${IdEtiquetaOK}`;
        data.method = "PUT";
        data.api = `/shipping`;
        data.process = "Actualizar la info_ad en Entregas";

        // Actualización de la entrega
        const updatedShipping = await Shippings.findOneAndUpdate(
            { IdEntregaOK: IdEntregaOK, 'info_ad.IdEtiquetaOK': IdEtiquetaOK, IdNegocioOK: IdNegocioOK, IdInstitutoOK: IdInstitutoOK },
            { $set: { 'info_ad.$': newData } }, //$ representa la posicion del elemento en el array. $ se utiliza para referirse al 
            { new: true }                       //primer elemento que coincide con la condicion de busqueda de findOneAndUpdate
        );

        if (!updatedShipping) {
            data.status = 404;
            data.messageDEV = `No se encontró una info_ad con el ID ${IdEtiquetaOK}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `La info_ad con ID ${IdEtiquetaOK} se actualizó con éxito`;
        data.dataRes = updatedShipping;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La actualización de la info_ad con ID ${IdEtiquetaOK} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

//DELETE
export const DeleteInfoAdsrv = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdEtiquetaOK) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Eliminar la Info Ad con Valores: ${IdInstitutoOK}, ${IdNegocioOK}, ${IdEntregaOK}, ${IdEtiquetaOK}`;
        data.method = "DELETE";
        data.api = `/shipping`;
        data.process = "Eliminar la Info Ad en la colección de Entregas";

        // Utiliza $pull para eliminar el subdocumento en el array
        const result = await Shippings.updateOne(
            {
                IdInstitutoOK: IdInstitutoOK,
                IdNegocioOK: IdNegocioOK,
                IdEntregaOK: IdEntregaOK,
            },
            {
                $pull: {
                    info_ad: { IdEtiquetaOK: IdEtiquetaOK },
                },
            }
        );

        if (result.deletedCount === 0) {
            data.status = 404;
            data.messageDEV = `No se encontró una Info Ad con los valores proporcionados`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "Info Ad eliminada correctamente";

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminación de la Info Ad falló";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
//=============================================FIN PARA SUBDOC INFO_AD=============================================

//=============================================PARA SUBDOC ENVIOS=============================================
//POST
//POST CON ID PARA INSERTAR EN SUBDOCUMENTOS
export const AddEnviossrv = async (newShipping, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo envío";
        data.method = "POST";
        data.api = `/shipping/subdocumentE${queryParams}`;
        data.process = "Agregar un nuevo envío a la colección de Entregas";

        const result = await Shippings.updateOne(
            // Usar los tres IDs como condiciones de búsqueda
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK
            }, 
            // Pasar el array (subdocumento) que es parte del documento principal
            { $push: { envios: newShipping } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción del envío <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción del envío <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción del envío <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

//PUT
export const UpdateEnviossrv = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdDomicilioOK, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar el envío con ID ${IdDomicilioOK}`;
        data.method = "PUT";
        data.api = `/shipping`;
        data.process = "Actualizar envío de Entregas";

        // Actualización de la entrega
        const updatedShipping = await Shippings.findOneAndUpdate(
            { IdEntregaOK: IdEntregaOK, 'envios.IdDomicilioOK': IdDomicilioOK, IdNegocioOK: IdNegocioOK, IdInstitutoOK: IdInstitutoOK },
            { $set: { 'envios.$': newData } },
            { new: true }
        );

        if (!updatedShipping) {
            data.status = 404;
            data.messageDEV = `No se encontró un envío con el ID ${IdDomicilioOK}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `El envío con ID ${IdDomicilioOK} se actualizó con éxito`;
        data.dataRes = updatedShipping;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La actualización del envío con ID ${IdDomicilioOK} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

//DELETE
export const DeleteEnviossrv = async (IdInstitutoOK, IdNegocioOK, IdEntregaOK, IdDomicilioOK) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Eliminar el envío con Valores: ${IdInstitutoOK}, ${IdNegocioOK}, ${IdEntregaOK}, ${IdDomicilioOK}`;
        data.method = "DELETE";
        data.api = `/shipping`;
        data.process = "Eliminar el subdocumento envío en la colección de Entregas";

        // Utiliza $pull para eliminar el subdocumento en el array
        const result = await Shippings.updateOne(
            {
                IdInstitutoOK: IdInstitutoOK,
                IdNegocioOK: IdNegocioOK,
                IdEntregaOK: IdEntregaOK,
            },
            {
                $pull: {
                    envios: { IdDomicilioOK: IdDomicilioOK },
                },
            }
        );

        if (result.deletedCount === 0) {
            data.status = 404;
            data.messageDEV = `No se encontró un envío con los valores proporcionados`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "Envío eliminado correctamente";

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminación del envío falló";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
//=============================================FIN PARA SUBDOC ENVIOS=============================================

//=============================================PARA SUBDOC INFO_AD DE SUBDOC ENVIOS=============================================
export const AddEnviosInfoAdsrv = async (newInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar una nueva info_ad a envío";
        data.method = "POST";
        data.api = `/shipping/subdocumentEInf${queryParams}`;
        data.process = "Agregar una nueva info_ad a envio";

        const result = await Shippings.updateOne(
            // Usar los tres IDs como condiciones de búsqueda
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                // Agregar condición para encontrar el envío específico dentro del subdocumento envios
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK
            }, 
            // Pasar el array (subdocumento) que es parte del documento principal
            { $push: { "envios.$.info_ad": newInfoAd } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción de la info_ad <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción de la info_ad <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de la info_ad <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

export const UpdateEnviosInfoAdsrv = async (updatedInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Actualizar info_ad en envío";
        data.method = "PUT";
        data.api = `/shipping/subdocumentEInf${queryParams}`;
        data.process = "Actualizar info_ad en envio";

        const result = await Shippings.updateOne(
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK,
                // Agregar condición para encontrar la info_ad específica por IdEtiquetaOK
                "envios.info_ad.IdEtiquetaOK": updatedInfoAd.IdEtiquetaOK
            }, 
            // Actualizar el subdocumento info_ad con los nuevos datos
            //originalmente esta parte del set era envios.$.info_ad.$ pero se agrego lo de outer e inner porque eran muchos
            //marcadores de posicion ($) y marcaba error. Eso pasa cuando se intenta acceder a un subdoc dentro de un array
            //dentro de otro array, por lo cual se usa outer que es el IdDomicilio de envios e inner que es el IdEtiqueta de info_ad
            { $set: { "envios.$[outer].info_ad.$[inner]": updatedInfoAd } },
            // Configuración de la opción de arrayFilters para identificar los elementos específicos en los arrays
            {
                arrayFilters: [
                    { "outer.IdDomicilioOK": queryParams.IdDomicilioOK },
                    { "inner.IdEtiquetaOK": updatedInfoAd.IdEtiquetaOK }
                ]
            }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La actualización de la info_ad <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La actualización de la info_ad <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La actualización de la info_ad <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

export const DeleteEnviosInfoAdsrv = async (queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Eliminar info_ad en envío";
        data.method = "DELETE";
        data.api = `/shipping/subdocumentEInf${queryParams}`;
        data.process = "Eliminar info_ad en envio";

        const result = await Shippings.updateOne(
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK,
                "envios.info_ad.IdEtiquetaOK": queryParams.IdEtiquetaOK
            }, 
            // Eliminar el subdocumento info_ad específico
            { $pull: { "envios.$.info_ad": { IdEtiquetaOK: queryParams.IdEtiquetaOK } } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La eliminación de la info_ad <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La eliminación de la info_ad <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminación de la info_ad <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
//=============================================FIN PARA SUBDOC INFO_AD DE SUBDOC ENVIOS=============================================

//=============================================PARA SUBDOC PRODUCTOS DE SUBDOC ENVIOS=============================================
export const AddProductossrv = async (newInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo producto a envío";
        data.method = "POST";
        data.api = `/shipping/subdocumentEPr${queryParams}`;
        data.process = "Agregar un nuevo producto a envio";

        const result = await Shippings.updateOne(
            // Usar los tres IDs como condiciones de búsqueda
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                // Agregar condición para encontrar el envío específico dentro del subdocumento envios
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK
            }, 
            // Pasar el array (subdocumento) que es parte del documento principal
            { $push: { "envios.$.productos": newInfoAd } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción de productos <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción de productos <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de productos <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

export const UpdateProductossrv = async (updatedInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Actualizar producto en envío";
        data.method = "PUT";
        data.api = `/shipping/subdocumentEPr${queryParams}`;
        data.process = "Actualizar producto en envios";

        const result = await Shippings.updateOne(
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK,
                // Agregar condición para encontrar la info_ad específica por IdEtiquetaOK
                "envios.productos.IdPresentaOK": updatedInfoAd.IdPresentaOK
            }, 
            // Actualizar el subdocumento info_ad con los nuevos datos
            //originalmente esta parte del set era envios.$.info_ad.$ pero se agrego lo de outer e inner porque eran muchos
            //marcadores de posicion ($) y marcaba error. Eso pasa cuando se intenta acceder a un subdoc dentro de un array
            //dentro de otro array, por lo cual se usa outer que es el IdDomicilio de envios e inner que es el IdEtiqueta de info_ad
            { $set: { "envios.$[outer].productos.$[inner]": updatedInfoAd } },
            // Configuración de la opción de arrayFilters para identificar los elementos específicos en los arrays
            {
                arrayFilters: [
                    { "outer.IdDomicilioOK": queryParams.IdDomicilioOK },
                    { "inner.IdPresentaOK": updatedInfoAd.IdPresentaOK }
                ]
            }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La actualización de producto <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La actualización de producto <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La actualización de producto <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

export const DeleteProductossrv = async (queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Eliminar producto en envío";
        data.method = "DELETE";
        data.api = `/shipping/subdocumentEPr${queryParams}`;
        data.process = "Eliminar producto en envios";

        const result = await Shippings.updateOne(
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK,
                "envios.productos.IdPresentaOK": queryParams.IdPresentaOK
            }, 
            // Eliminar el subdocumento productos específico
            { $pull: { "envios.$.productos": { IdPresentaOK: queryParams.IdPresentaOK } } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La eliminación del producto <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La eliminación del producto <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminación del producto <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
//=============================================FIN PARA SUBDOC PRODUCTOS DE SUBDOC ENVIOS=============================================

//=============================================PARA SUBDOC ESTATUS DE SUBDOC ENVIOS=============================================
export const AddEstatussrv = async (newInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo estatus a envío";
        data.method = "POST";
        data.api = `/shipping/subdocumentESt${queryParams}`;
        data.process = "Agregar un nuevo estatus a envio";

        const result = await Shippings.updateOne(
            // Usar los tres IDs como condiciones de búsqueda
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                // Agregar condición para encontrar el envío específico dentro del subdocumento envios
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK
            }, 
            // Pasar el array (subdocumento) que es parte del documento principal
            { $push: { "envios.$.estatus": newInfoAd } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción de estatus <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción de estatus <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de estatus <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

export const UpdateAllEstatusSrv = async (updateInfo, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Actualizar todos los estatus en envío";
        data.method = "PUT";
        data.api = `/shipping/updateAllEstatus${queryParams}`;
        data.process = "Actualizar todos los estatus en envio";

        const result = await Shippings.updateOne(
            // Usar los tres IDs como condiciones de búsqueda
            {
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                // Agregar condición para encontrar el envío específico dentro del subdocumento envios
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK
            },
            // Actualizar el campo "Actual" en todos los objetos dentro del arreglo "estatus"
            { $set: { "envios.$[].estatus.$[].Actual": updateInfo.Actual } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La actualización de estatus <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La actualización de estatus <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La actualización de estatus <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
//=============================================PARA SUBDOC RASTREOS DE SUBDOC ENVIOS=============================================
export const AddRastreossrv = async (newInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo rastreo a envío";
        data.method = "POST";
        data.api = `/shipping/subdocumentERa${queryParams}`;
        data.process = "Agregar un nuevo rastreo a envio";

        const result = await Shippings.updateOne(
            // Usar los tres IDs como condiciones de búsqueda
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                // Agregar condición para encontrar el envío específico dentro del subdocumento envios
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK
            }, 
            // Pasar el array (subdocumento) que es parte del documento principal
            { $set: { "envios.$.rastreos": newInfoAd } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción de rastreo <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción de rastreo <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de rastreo <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

export const DeleteRastreossrv = async (queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Eliminar un rastreo de envío";
        data.method = "DELETE";
        data.api = `/shipping/subdocumentERa`;
        data.process = "Eliminar un rastreo de envío";

        const result = await Shippings.updateOne(
            {
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK,
                "envios.rastreos.NumeroGuia": queryParams.NumeroGuia,
            },
            {
                $unset: { "envios.$.rastreos": 1 }
            }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La eliminación de rastreo <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La eliminación de rastreo <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminación de rastreo <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
//=============================================PARA SUBDOC SEGUIMIENTO DE SUBDOC ENVIOS=============================================
export const AddSeguimientosrv = async (newInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo seguimiento a rastreos";
        data.method = "POST";
        data.api = `/shipping/subdocumentESt${queryParams}`;
        data.process = "Agregar un nuevo seguimiento a rastreos";

        const result = await Shippings.updateOne(
            // Use the three IDs as search conditions
            { 
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                // Add condition to find the specific shipment within the subdocument envios
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK
            }, 
            // Use the $push operator to add the new status to the seguimiento array
            { $push: { "envios.$.rastreos.seguimiento": newInfoAd } }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción de seguimiento <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción de seguimiento <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de seguimiento <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Whether there is an error or not, this block always executes
    }
};

export const UpdateSeguimientosrv = async (updatedInfoAd, queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Actualizar seguimiento en rastreo";
        data.method = "PUT";
        data.api = `/shipping/subdocumentEPr${queryParams}`;
        data.process = "Actualizar seguimiento en rastreo";

        const result = await Shippings.updateOne(
            {
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK,
                "envios.rastreos.seguimiento.Ubicacion": updatedInfoAd.Ubicacion
            },
            // Actualizar el subdocumento info_ad con los nuevos datos
            {
                $set: {
                    "envios.$[outer].rastreos.seguimiento.$[inner]": updatedInfoAd
                }
            },
            // Configuración de la opción de arrayFilters para identificar los elementos específicos en los arrays
            {
                arrayFilters: [
                    { "outer.IdDomicilioOK": queryParams.IdDomicilioOK },
                    { "inner.Ubicacion": updatedInfoAd.Ubicacion }
                ]
            }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La actualización de seguimiento no fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La actualización de seguimiento fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La actualización de seguimiento no fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};

export const DeleteSeguimientosrv = async (queryParams) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Eliminar seguimiento en rastreo";
        data.method = "DELETE";
        data.api = `/shipping/subdocumentESe${queryParams}`;
        data.process = "Eliminar seguimiento en rastreo";

        const result = await Shippings.updateOne(
            {
                IdEntregaOK: queryParams.IdEntregaOK,
                IdInstitutoOK: queryParams.IdInstitutoOK,
                IdNegocioOK: queryParams.IdNegocioOK,
                "envios.IdDomicilioOK": queryParams.IdDomicilioOK
            },
            // Eliminar el subdocumento que cumple con los criterios dados
            {
                $pull: {
                    "envios.$[outer].rastreos.seguimiento": {
                        Ubicacion: queryParams.Ubicacion // Ajusta este campo según tus necesidades
                    }
                }
            },
            // Configuración de la opción de arrayFilters para identificar los elementos específicos en los arrays
            {
                arrayFilters: [
                    { "outer.IdDomicilioOK": queryParams.IdDomicilioOK }
                ]
            }
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La eliminación de seguimiento no fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La eliminación de seguimiento fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminación de seguimiento no fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
