import * as ProdServServices from '../services/prodServ.service';
import boom from '@hapi/boom';

//FIC: API GET
//----------------------------------------
//FIC: Todos los Productos/Servicios.
export const getProdServList = async (req, res, next) => {
    try{
      const prodServList = await ProdServServices.getProdServList();
      if (!prodServList) {
        throw boom.notFound('No se encontraron productos/servicios registrados.');
      } else if (prodServList) {
        res.status(200).json(prodServList);
      }

      } catch(error) {
        next(error);
      }
    };

//FIC: Solo un Producto/Servicio.
export const getProdServItem = async (req, res, next) => {
    try {
      //FIC: obtener parametro id mediante la
      //desestructuracion de objetos
      const { id } = req.params;
      //FIC: se obtiene parametro de la forma
      //clase/objeto.
      //const idProdServ = req.params.id;
    const keyType = req.query.keyType || 'OK';
    const prodServItem = await ProdServServices.getProdServItem(id, keyType);
    if (!prodServItem) {
      throw boom.notFound('No se encontraron productos/servicios registrados.');
    } else if (prodServItem) {
      res.status(200).json(prodServItem);
    }
  }catch(error){
    next(error);
  }
  };


  //FIC: API POST.
//----------------------------------------
//FIC: API POST (ADD) Producto y/o Servicio.
export const postProdServItem = async (req, res, next) => {
  try {
    const paProdServItem = req.body;
    const newProdServItem = await ProdServServices.postProdServItem(paProdServItem);
    if (!newProdServItem) {
      throw boom.badRequest('No se pudo crear el Producto y/o Servicio.');
    } else if (newProdServItem) {
      res.status(201).json(newProdServItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//PUT
export const putProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
        console.log('FIC: controller id -> ', id);
    const paInstitutoItem = req.body;
        console.log('FIC: controller body -> ', paInstitutoItem);
    const updatedInstitutoItem = await ProdServServices.putProdServItem(id, paInstitutoItem);
    if (!updatedInstitutoItem) {
      throw boom.badRequest('No se pudo actualizar el Instituto.');
    } else if (updatedInstitutoItem) {
      res.status(200).json(updatedInstitutoItem);
   }
  } catch (error) {
    next(error);
  }
};


//DELETEEEEEEEEEEEEEEEEEEEEEEEEEE
export const deleteProdServItem = async (req, res, next) => {
  try {
    // Obtener el ID del elemento a eliminar desde los parámetros de la solicitud
    const itemId = req.params.id;

    // Llamar a la función 'deleteProdServItem' del servicio para eliminar el elemento
    const deletedItem = await ProdServServices.deleteProdServItem(itemId);

    if (!deletedItem) {
      throw boom.badRequest('No se pudo eliminar el Producto y/o Servicio.');
    } else if (deletedItem) {
      // Responder con un mensaje de éxito
      res.status(200).json({ message: 'Producto y/o Servicio eliminado con éxito.' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

