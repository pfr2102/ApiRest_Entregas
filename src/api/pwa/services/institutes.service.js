import Entregas from '../models/shipping';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';


//===========================================================GET===========================================================S
export const getEntregasAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todas las Entregas";
        data.method = "GET";
        data.api = "/entrega";
        data.process = "Extraer todas las Entregas de la coleccción de Entregas";

        const EntregasAll = await Entregas.find()
        .then((entregas) => {
            if(!entregas) {
                data.status = 404;
                data.messageDEV = "La base de datos <<NO>> tiene Entregas configuradas";
                throw Error(data.messageDEV);
            }

            return entregas;
        });

        data.status = 200; //200 = codigo cuando encuentras documentos
        data.messageUSR = "La extracción de las Entregas <<SI>> tuvo exito";
        data.dataRes = EntregasAll;

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
export const addEntregas = async(newEntrega) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar una nueva Entrega";
        data.method = "POST";
        data.api = "/entrega";
        data.process = "Agregar una nueva entrega a la coleccción de Entregas";

        const entregaAdded = await Entregas.insertMany(
            newEntrega,
            { order: true }
        )
        .then((entrega) => {
            if(!entrega) {
                data.status = 400; //400 de que no se pudo insertar; es diferente a 404
                data.messageDEV = "La inserción de la Entrega <<NO>> fue exitosa";
                throw Error(data.messageDEV);
            }

            return entrega;
        });

        data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
        data.messageUSR = "La inserción de la Entrega <<SI>> fue exitosa";
        data.dataRes = entregaAdded;

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
export const updateEntrega = async (id, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar la Entrega con ID ${id}`;
        data.method = "PUT";
        data.api = `/entrega/${id}`;
        data.process = `Actualizar la Entrega en la colección de Entregas`;

        // Aquí realizas la actualización de la entrega
        const updatedEntrega = await Entregas.findOneAndUpdate({ id_ordenOK: id }, newData, {
            new: true, // Esto te devolverá el documento actualizado en lugar del anterior
        });

        if (!updatedEntrega) {
            data.status = 404;
            data.messageDEV = `No se encontró una Entrega con el ID ${id}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `La Entrega con ID ${id} se actualizó con éxito`;
        data.dataRes = updatedEntrega;

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
export const deleteEntregaByValue = async (valueToDelete) => {
    try {
      // Realiza la eliminación del documento en función del valor proporcionado
      const result = await Entregas.deleteOne({ id_ordenOK: valueToDelete });
  
      if (result.deletedCount === 0) {
        // Si no se encontró un documento para eliminar, lanza un error
        throw new Error('Entrega no encontrado.');
      }
  
      return { message: 'Entrega eliminado correctamente.' };
    } catch (error) {
      throw error;
    }
  };
//===========================================================FIN DELETE===========================================================