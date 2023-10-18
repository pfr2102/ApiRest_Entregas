import * as entregaServices from '../services/institutes.service';

//*************************************************************************************************** */
// GET
export const getEntregasAll = async(req, res, next) => {
    try{
        const entregasAll = await entregaServices.getEntregasAll();
        
        if(entregasAll) {
            return res.status(entregasAll.status).json(entregasAll);
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

export const addEntregas = async(req, res, next) => {
    try{
        const entregasAdded = await entregaServices.addEntregas(req.body);
        
        if(entregasAdded) {
            return res.status(entregasAdded.status).json(entregasAdded);
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
export const updateEntrega = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el ID de la entrega desde los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await entregaServices.updateEntrega(id, newData);

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
export const deleteEntregaByValue = async (req, res, next) => {
    try {
      const { valueToDelete } = req.params; // Obtén el valor a eliminar de los parámetros de la solicitud
  
      // Llama al servicio de eliminación y pasa el valor a eliminar
      const result = await entregaServices.deleteEntregaByValue(valueToDelete);
  
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
// FIN DELETE
//*************************************************************************************************** */