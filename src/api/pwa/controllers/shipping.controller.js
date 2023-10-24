import * as shippingServices from '../services/shipping.service';

//*************************************************************************************************** */
// GET
export const getShippingsAll = async(req, res, next) => {
    try{
        const shippingsAll = await shippingServices.getShippingsAll();
        
        if(shippingsAll) {
            return res.status(shippingsAll.status).json(shippingsAll);
        }
    }catch(error){
        next(error);
    }
};

//GET DOCUMENTSBYSTATUS
export const getInstitutesByStatus = async (req, res, next) => {
    try {
        const { estado } = req.query; // Obtiene el estado desde la URL
        
        if (!estado) {
            return res.status(400).json({ message: 'El parámetro estado es requerido.' });
        }

        const institutesByStatus = await institutesServices.getInstitutesByStatus(estado);
        
        if (institutesByStatus) {
            return res.status(institutesByStatus.status).json(institutesByStatus);
        }
    } catch (error) {
        next(error);
    }
};
// FIN GET
//*************************************************************************************************** */
//*************************************************************************************************** */
// POST

export const addShippings = async(req, res, next) => {
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
export const updateShipping = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el ID de la entrega desde los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await shippingServices.updateShipping(id, newData);

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
export const deleteShippingByValue = async (req, res, next) => {
    try {
      const { valueToDelete } = req.params; // Obtén el valor a eliminar de los parámetros de la solicitud
  
      // Llama al servicio de eliminación y pasa el valor a eliminar
      const result = await shippingServices.deleteShippingByValue(valueToDelete);
  
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
// FIN DELETE
//*************************************************************************************************** */