import { Router } from "express";
import config from '../../../config/config';

//Aqui se agregan los import de cada router de api que se cree
//------------------------------------------------------------
import shippingRoutes from './entregas.routes';
import etiquetasRoutes from './etiquetas.routes';
import ordenesRoutes from './ordenes.routes';
import personasRoutes from './personas.routes';
import institutesRoutes from './institutes.routes'
//------------------------------------------------------------

const routerAPI = (app) => {
    const router = Router();
    const api = config.API_URL;
    app.use(api, router);

    //Aqui se agrega la ruta de toda api nueva que se cree
    //----------------------------------------------------
    router.use('/pwa/shipping', shippingRoutes);
    router.use('/pwa/labels', etiquetasRoutes);
    router.use('/pwa/orders', ordenesRoutes);
    router.use('/pwa/persons', personasRoutes);
    router.use('/pwa/institutes', institutesRoutes);
    //----------------------------------------------------

    return router;
}

module.exports = routerAPI;