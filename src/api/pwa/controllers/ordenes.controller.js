import * as ordersService from "../services/ordenes.services";

// GET ALL************************************************************************************************ */

export const GetAllOrders = async (req, res, next) => {
  try {
    const ordenesAll = await ordersService.GetAllOrders();
    if (ordenesAll) {
      return res.status(ordenesAll.status).json(ordenesAll);
    }
  } catch (error) {
    next(error);
  }
};

// GET ONE BY ID************************************************************************************************ */

export const GetOneOrderByID = async (req, res, next) => {
  try {
    const { IdInstitutoOK, IdNegocioOK,IdOrdenOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud

    // Llamar a la función para buscar y pasa el valor
    const result = await ordersService.GetOneOrderByID(IdInstitutoOK, IdNegocioOK,IdOrdenOK);

    if (result) {
      return res.status(result.status).json(result);
    }
  } catch (error) {
    next(error);
  }
};

// POST********************************************************************************************** */
export const AddOneOrder = async (req, res, next) => {
  try {
    const ordenesAdded = await ordersService.AddOneOrder(req.body);

    if (ordenesAdded) {
      return res.status(ordenesAdded.status).json(ordenesAdded);
    }
  } catch (error) {
    next(error);
  }
};
// FIN POST*************************************************************************************** */
// PUT*********************************************************************************************** */
export const UpdateOneOrder = async (req, res, next) => {
    try {
      const { IdInstitutoOK, IdNegocioOK,IdOrdenOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        // Llamar a la función para buscar y pasa el valor
        const result = await ordersService.UpdateOneOrder(IdInstitutoOK, IdNegocioOK,IdOrdenOK,newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};
// FIN PUT********************************************************************************************* */
//PUT PATCH********************************************************************************************* */
export const UpdatePatchOneOrder = async (req, res, next) => {
  try {
      const { IdInstitutoOK, IdNegocioOK, IdOrdenOK} = req.query;
      console.log(req.body);
      const updateData = req.body;
      const orderUpdate = await ordersService.UpdatePatchOneOrder(IdInstitutoOK, IdNegocioOK, IdOrdenOK, updateData);
      if (orderUpdate) {
          orderUpdate.session = null;
          return res.status(orderUpdate.status).json(orderUpdate);
      }
  } catch (error) {
      next(error);
  }
};
//FIN PUT PATCH********************************************************************************************* */

// DELETE************************************************************************************************ */
export const DeleteOneOrder = async (req, res, next) => {
  try {
    const { IdInstitutoOK, IdNegocioOK,IdOrdenOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud

    // Llamar a la función para buscar y pasa el valor
    const result = await ordersService.DeleteOneOrder(IdInstitutoOK, IdNegocioOK,IdOrdenOK);


    if (result.status === 200) {
      return res.status(200).json(result);
    } else if (result.status === 404) {
      return res.status(404).json(result);
    }
  } catch (error) {
    next(error);
  }
};
// FIN DELETE********************************************************************************************* */
