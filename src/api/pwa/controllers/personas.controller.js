import * as personasServices from '../services/personas.service';

//*************************************************************************************************** */
// GET
export const getPersonasAll = async(req, res, next) => {
    try{
        const personasAll = await personasServices.getPersonasAll();
        
        if(personasAll) {
            return res.status(personasAll.status).json(personasAll);
        }
    }catch(error){
        next(error);
    }
};

// FIN GET
