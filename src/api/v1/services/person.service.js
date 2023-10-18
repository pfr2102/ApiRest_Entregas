//FIC: Add import
import { OK, FAIL } from '../middlewares/resp.handler';

//FIC: ADD MANY PERSONS FROM WEB/PWA ¡NO SAP!
export const addManyPersonsPWA = async (persons) => {
    try {
        const personsAdded = await cat_prod_serv.insertMany(persons, { order: true });
        return OK('Persona(s) agregada(s) correctamente al catalogo.', personsAdded);
    } catch (error) {
        if (error.code === 11000) {
            return FAIL(
                'Alguna(s) de las personas enviadas ya están registradas en el catalogo de la BD. Verifica la información e intenta de nuevo.',
                error
            );
        } else {
            return FAIL(
                'No se pudo agregar la persona al catalogo. Error en el servidor.',
                error
            );
        }
    }
};

//PUSH OBJECT NEW INFO ADICIONAL
const pushObjInfoAdCO = async (id, objInfoAd) => {
    try {
        const contractUpdatedCO = await cat_prod_serv.findOneAndUpdate(
            { IdContratoBK: id },
            { $push: { cat_prod_serv_estatus: objInfoAd } },
            { new: true }
        );
        return { succes: true, contractUpdatedCO };
    } catch (error) {
        return { succes: false, error };
    }
};