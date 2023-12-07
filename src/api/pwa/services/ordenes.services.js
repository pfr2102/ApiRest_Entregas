import ordersModel from "../models/ordenes";
import {
  OK,
  FAIL,
  BITACORA,
  DATA,
  AddMSG,
} from "../../../middlewares/respPWA.handler";

//==========================================GET===========================================================S
export const GetAllOrders = async () => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Extraer todas las Ordenes";
    data.method = "GET";
    data.api = "/orders";
    data.process = "Extraer todas las odenes de la coleccción de Ordenes";

    const allOrders = await ordersModel.find().then((orders) => {
      if (!orders) {
        data.status = 404;
        data.messageDEV = "La base de datos <<NO>> tiene Ordenes configuradas";
        throw Error(data.messageDEV);
      }

      return orders;
    });

    data.status = 200; //200 = codigo cuando encuentras documentos
    data.messageUSR = "La extracción de las Ordenes <<SI>> tuvo exito";
    data.dataRes = allOrders;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La extracción de las Ordenes <<NO>> tuvo exito";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN GET===========================================================

//==========================================GET ONE BY ID===========================================================S
export const GetOneOrderByID = async (IdInstitutoOK, IdNegocioOK,IdOrdenOK) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = `Obtener Orden por id`;
    data.method = "GET ONE ORDER BY ID";
    data.api = `/orders/${IdInstitutoOK}`;
    data.process = `Obtener un Orden específico de la colección de Ordenes por su ID`;

    const oneOrder = await ordersModel.findOne({ 
      IdInstitutoOK: IdInstitutoOK, 
      IdNegocioOK: IdNegocioOK, 
      IdOrdenOK: IdOrdenOK 
    });
    if (!oneOrder) {
      data.status = 404;
      data.messageDEV = `No se encontró una Orden con id.`;
      throw Error(data.messageDEV);
    }else{

    data.status = 200;
    data.messageUSR = "La obtención de la Orden <<SI>> tuvo éxito";
    data.dataRes = oneOrder;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
  }
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La obtención de la Orden <<NO>> tuvo éxito";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN GET ONE BY ID===========================================================

//=========================================POST===========================================================
export const AddOneOrder = async (newOrden) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Agregar una nueva Orden";
    data.method = "POST";
    data.api = "/orders";
    data.process = "Agregar una nueva Orden a la coleccción de Ordenes";

    const addedOrder = await ordersModel.insertMany(newOrden, { order: true }).then(
      (order) => {
        if (!order) {
          data.status = 400; //400 de que no se pudo insertar; es diferente a 404
          data.messageDEV = "La inserción de la Orden <<NO>> fue exitosa";
          throw Error(data.messageDEV);
        }

        return order;
      }
    );

    data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
    data.messageUSR = "La inserción de la Orden <<SI>> fue exitosa";
    data.dataRes = addedOrder;

    bitacora = AddMSG(bitacora, data, "OK", 201, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La inserción de la Orden <<NO>> fue exitosa";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN POST===========================================================

//==============================================PUT===========================================================
export const UpdateOneOrder = async (IdInstitutoOK, IdNegocioOK, IdOrdenOK, newData) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
      bitacora.process = `Actualizar la Orden con ID`;
      data.method = "PUT";
      data.api = `/orders/${IdInstitutoOK}`;
      data.process = "Actualizar la Orden en la colección de Ordenes";

      const updatedOrden = await ordersModel.findOneAndUpdate({ IdInstitutoOK: IdInstitutoOK, IdNegocioOK: IdNegocioOK,IdOrdenOK: IdOrdenOK }, newData, {
          new: true, 
      });

      if (!updatedOrden) {
          data.status = 404;
          data.messageDEV = `No se encontró una Orden con el ID`;
          throw Error(data.messageDEV);
      }

      data.status = 200;
      data.messageUSR = `Orden con el ID se actualizó con éxito`;
      data.dataRes = updatedOrden;

      bitacora = AddMSG(bitacora, data, 'OK', 200, true);

      return OK(bitacora);
  } catch (error) {
      if (!data.status) data.status = error.statusCode;
      let { message } = error;
      if (!data.messageDEV) data.messageDEV = message;
      if (data.dataRes.length !== 0) data.dataRes = error;
      data.messageUSR = `La actualización de la Orden con ID falló`;

      bitacora = AddMSG(bitacora, data, 'FAIL');

      return FAIL(bitacora);
  }
  finally {
      // Haya o no error siempre ejecuta aquí
  }
}
//==========================================FIN PUT===========================================================

//===========================================PATCH===========================================================
export const UpdatePatchOneOrder = async (IdInstitutoOK, IdNegocioOK, IdOrdenOK,updateData) => {
  let bitacora = BITACORA();
  let response = UpdatePatchOneOrderMethod(bitacora,IdInstitutoOK, IdNegocioOK, IdOrdenOK,updateData);
  return response;
};

export const UpdatePatchOneOrderMethod = async (bitacora, IdInstitutoOK, IdNegocioOK, IdOrdenOK, updateData) => {
  let data = DATA();
  try {
    bitacora.process = 'Modificar una orden';
    data.process = 'Modificar una orden';
    data.method = 'PATCH';
    data.api = '/one';

    let orderUpdated = null;

    // Encuentra el documento principal usando IdInstitutoOK, IdNegocioOK e IdOrdenOK
    const filter = {
      IdInstitutoOK: IdInstitutoOK,
      IdNegocioOK: IdNegocioOK,
      IdOrdenOK: IdOrdenOK
    };

    for (const key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        const value = updateData[key];

        const updateQuery = { $set: { [key]: value } };

        try {
          orderUpdated = await ordersModel.findOneAndUpdate(
            filter,
            updateQuery,
            { new: true }
          );

          if (!orderUpdated) {
            console.error("No se encontró un documento para actualizar con ese ID,", IdOrdenOK);
            data.status = 400;
            data.messageDEV = 'La actualización de un subdocumento de la orden NO fue exitosa.';
            throw new Error(data.messageDEV);
          }
        } catch (error) {
          console.error(error);
          data.status = 400;
          data.messageDEV = 'La Actualizacion de un Subdocumento de la orden NO fue exitosa.';
          throw Error(data.messageDEV);
        }
      }
    }

    data.messageUSR = 'La modificación de los subdocumentos de orden SI fue exitosa.';
    data.dataRes = orderUpdated;
    bitacora = AddMSG(bitacora, data, 'OK', 201, true);
    return OK(bitacora);
  } catch (error) {
    console.error(error);
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR =
      'La modificación de la orden NO fue exitosa.' +
      '\n' +
      'Any operations that already occurred as part of this transaction will be rolled back.';
    bitacora = AddMSG(bitacora, data, 'FAIL');
    return FAIL(bitacora);
  }
};

//==========================================FIN PATCH===========================================================

//===========================================DELETE===========================================================
export const DeleteOneOrder = async (IdInstitutoOK, IdNegocioOK, IdOrdenOK) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = `Eliminar la Orden con ID`;
    data.method = "DELETE";
    data.api = `/orders/${IdInstitutoOK}`;
    data.process = "Eliminar la Orden en la colección de Ordenes";
    // Realiza la eliminación del documento en función del valor proporcionado
    const result = await ordersModel.deleteOne({ IdInstitutoOK: IdInstitutoOK, IdNegocioOK: IdNegocioOK,IdOrdenOK: IdOrdenOK });

    if (result.deletedCount === 0) {
      // Si no se encontró un documento para eliminar, lanza un error
      //throw new Error('Orden no encontrada.');
      data.status = 404;
      data.messageDEV = `No se encontró una Orden con el ID`;
      throw Error(data.messageDEV);
    }

    //return { message: 'Orden eliminada correctamente.' };
    data.status = 200;
    data.messageUSR = `Orden con el ID se elimino con éxito`;
    data.dataRes = result;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La eliminacion de la Orden <<NO>> tuvo exito";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    // Haya o no error siempre ejecuta aquí
  }
};
//=======================================FIN DELETE===========================================================
