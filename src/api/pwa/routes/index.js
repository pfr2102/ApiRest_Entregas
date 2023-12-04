import { Router } from "express";
import config from '../../../config/config';

//Aqui se agregan los import de cada router de api que se cree
//------------------------------------------------------------
import shippingRoutes from './shipping.routes';
import etiquetasRoutes from './etiquetas.routes';
//------------------------------------------------------------

const routerAPI = (app) => {
    const router = Router();
    const api = config.API_URL;
    app.use(api, router);

    //Aqui se agrega la ruta de toda api nueva que se cree
    //----------------------------------------------------
    router.use('/pwa/shipping', shippingRoutes);
    router.use('/pwa/etiquetas', etiquetasRoutes);
    //----------------------------------------------------

    return router;
}

module.exports = routerAPI;