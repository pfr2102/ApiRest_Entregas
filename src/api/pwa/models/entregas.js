import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';


const shippingsSchemaPWA = new mongoose.Schema({
	IdInstitutoOK: { type: String },
    IdNegocioOK: { type: String },
    IdEntregaOK: { type: String },
	IdEntregaBK: { type: String },
	IdOrdenOK: { type: String },
    info_ad: [
        {
            _id: false,
            IdEtiquetaOK: { type: String },     //Si trai
            IdEtiqueta: { type: String },       //No trai
            Etiqueta: { type: String },         //Si trai
            Valor: { type: String },            //Si trai
            IdTipoSeccionOK: { type: String },  //No trai
            Secuencia: { type: Number },        //Si trai
            detail_row: {
                _id: false,
                Activo: { type: String, default: 'S' },
                Borrado: { type: String, default: 'N' },
                detail_row_reg: [
                    {
                        _id: false,
                        FechaReg: {type : Date, default: Date.now},
                        UsuarioReg: { type: String },
                    }
                ]
            }
        }
    ],
    envios: [
        {
            _id: false,
            IdDomicilioOK: { type: String },
            IdPaqueteriaOK: { type: String },
            IdTipoMetodoEnvio: { type: String },
            CostoEnvio: { type: Number },
            info_ad: [
                {
                    _id: false,
                    IdEtiquetaOK: { type: String },
                    IdEtiqueta: { type: String },
                    Etiqueta: { type: String },
                    Valor: { type: String },
                    IdTipoSeccionOK: { type: String },
                    Secuencia: { type: Number },
                    detail_row: {
                        _id: false,
                        Activo: { type: String, default: 'S' },
                        Borrado: { type: String, default: 'N' },
                        detail_row_reg: [
                            {
                                _id: false,
                                FechaReg: {type : Date, default: Date.now},
                                UsuarioReg: { type: String },
                            }
                        ]
                    }
                }
            ],
            productos: [
                {
                    _id: false,
                    IdProdServOK: { type: String }, //Sacar de la api de ordenes
                    IdPresentaOK: { type: String }, //Tambien
                    DesProdServ: { type: String },
                    DesPresenta: { type: String },
                    CantidadPed: { type: Number },
                    CantidadEnt: { type: Number },
                }
            ],
            estatus: [
                {
                    _id: false,
                    IdTipoEstatusOK: { type: String },
                    Actual: { type: String },
                    Observacion: { type: String },
                    detail_row: {
                        _id: false,
                        Activo: { type: String, default: 'S' },
                        Borrado: { type: String, default: 'N' },
                        detail_row_reg: [
                            {
                                _id: false,
                                FechaReg: {type : Date, default: Date.now},
                                UsuarioReg: { type: String },
                            }
                        ]
                    }
                }
            ],
            rastreos: {
                    _id: false,
                    NumeroGuia: { type: String },
                    IdRepartidorOK: { type: String },
                    NombreRepartidor: { type: String },
                    Alias: { type: String },
                    seguimiento: [
                        {
                            _id: false,
                            Ubicacion: { type: String },
                            DesUbicacion: { type: String },
                            Referencias: { type: String },
                            Observacion: { type: String },
                            FechaReg: {type : Date, default: Date.now},
                            UsuarioReg: { type: String },
                        }
                    ]
                }
        }
    ],
    detail_row: {
        _id: false,
        Activo: { type: String, default: 'S' },
        Borrado: { type: String, default: 'N' },
        detail_row_reg: [
            {
                _id: false,
                FechaReg: {type : Date, default: Date.now},
                UsuarioReg: { type: String },
            }
        ]
    }
});


//FIC: ***********************
const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;
  
const conn =  obtenerConexion(dbName, dbCluster);
	
const model = obtenerModelo('entregas', 
						shippingsSchemaPWA,
						  conn, 
						  dbName, 
						  dbCluster);

export default model;