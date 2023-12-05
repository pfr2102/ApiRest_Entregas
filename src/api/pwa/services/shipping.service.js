import Shippings from '../models/shipping';
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

//POST CON ID PARA INSERTAR EN SUBDOCUMENTOS
export const addShippingsId = async (newShipping, shippingId) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar una nueva Entrega";
        data.method = "POST";
        data.api = `/shipping/${shippingId}`;
        data.process = "Agregar una nueva entrega a la colección de Entregas";

        // Incorporamos el shippingId a los datos de envío
        newShipping.shippingId = shippingId;

        const result = await Shippings.updateOne(
            { IdEntregaOK: shippingId }, // Pasar el id del documento principal donde se va guardar el subdocumento
            { $push: { info_ad: newShipping } } // Pasar el array (subdocumento) que es parte del documento principal
        );

        if (result.nModified === 0) {
            data.status = 400;
            data.messageDEV = "La inserción de la Entrega <<NO>> fue exitosa";
            throw Error(data.messageDEV);
        }

        data.status = 201;
        data.messageUSR = "La inserción de la Entrega <<SI>> fue exitosa";
        data.dataRes = result;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de la Entrega <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        // Haya o no error siempre ejecuta aquí
    }
};
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

//===========================================================FIN PATCH============================================================