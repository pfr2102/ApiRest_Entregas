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
export const updateShipping = async (id, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar la Entrega con ID ${id}`;
        data.method = "PUT";
        data.api = `/shipping/${id}`;
        data.process = "Actualizar la Entrega en la colección de Entregas";

        // Aquí realizas la actualización de la entrega
        const updatedShipping = await Shippings.findOneAndUpdate({ id_ordenOK: id }, newData, {
            new: true, // Esto te devolverá el documento actualizado en lugar del anterior
        });

        if (!updatedShipping) {
            data.status = 404;
            data.messageDEV = `No se encontró una Entrega con el ID ${id}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `La Entrega con ID ${id} se actualizó con éxito`;
        data.dataRes = updatedShipping;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La actualización de la Entrega con ID ${id} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        // Haya o no error siempre ejecuta aquí
    }
}
//===========================================================FIN PUT===========================================================

//===========================================================DELETE===========================================================
export const deleteShippingByValue = async (valueToDelete) => {
    let bitacora = BITACORA();
    let data = DATA();
  
    try {
      bitacora.process = `Eliminar la Entrega con Valor ${valueToDelete}`;
      data.method = "DELETE";
      data.api = `/shipping/${valueToDelete}`;
      data.process = "Eliminar la Entrega en la colección de Entregas";
  
      // Realiza la eliminación del documento en función del valor proporcionado
      const result = await Shippings.deleteOne({ id_ordenOK: valueToDelete });
  
      if (result.deletedCount === 0) {
        data.status = 404;
        data.messageDEV = `No se encontró una Entrega con el valor ${valueToDelete}`;
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
      data.messageUSR = `La eliminación de la Entrega con valor ${valueToDelete} falló`;
  
      bitacora = AddMSG(bitacora, data, 'FAIL');
  
      return FAIL(bitacora);
    } finally {
      // Haya o no error siempre ejecuta aquí
    }
  };  
//===========================================================FIN DELETE===========================================================