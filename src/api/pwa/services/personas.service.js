import personas from '../models/personas';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';


//===========================================================GET===========================================================S
export const getPersonasAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todas las Personas";
        data.method = "GET";
        data.api = "/personas";
        data.process = "Extraer todas las Personas de la coleccción de cat_personas";

        const PersonasAll = await personas.find()
        .then((personas) => {
            if(!personas) {
                data.status = 404;
                data.messageDEV = "La base de datos <<NO>> tiene Personas configuradas";
                throw Error(data.messageDEV);
            }

            return personas;
        });

        data.status = 200; //200 = codigo cuando encuentras documentos
        data.messageUSR = "La extracción de las Personas <<SI>> tuvo exito";
        data.dataRes = PersonasAll;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La extracción de las Personas <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}

//===========================================================FING GET===========================================================


