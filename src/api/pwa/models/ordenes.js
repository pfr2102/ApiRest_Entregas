import * as mongoose from "mongoose";
import config from "../../../config/config";
import obtenerConexion from "../../../config/connectionsFactory";
import obtenerModelo from "../../../config/modelsFactory";

const ordenesSchemaPWA = new mongoose.Schema({
  IdInstitutoOK : { type: String },
  IdNegocioOK : { type: String },
  IdOrdenOK: { type: String },
  IdOrdenBK: { type: String },
  IdTipoOrdenOK: { type: String },
  IdRolOK: { type: String },
  IdPersonaOK: { type: String },
  ordenes_estatus: [
    {
      IdTipoEstatusOK: { type: String },
      Actual: { type: String },
      Observacion: { type: String },
      detail_row: {
        Activo: { type: String, default: "S" },
        Borrado: { type: String, default: "N" },
        detail_row_reg: [
          {
            FechaReg: { type: Date, default: Date.now },
            UsuarioReg: { type: String },
            _id: false,
          },
        ],
        _id: false,
      },
      _id: false,
    },
  ],
  ordenes_info_ad: [
    {
      IdEtiquetaOK: { type: String },
      IdEtiqueta: { type: String, require: true },
      Etiqueta: { type: String, require: true },
      Valor: { type: String, require: true },
      IdTipoSeccionOK: { type: String, require: true },
      Secuencia: { type: Number, require: true },
      detail_row: {
        Activo: { type: String, default: "S" },
        Borrado: { type: String, default: "N" },
        detail_row_reg: [
          {
            FechaReg: { type: Date, default: Date.now },
            UsuarioReg: { type: String },
            _id: false,
          },
        ],
        _id: false,
      },
      _id: false,
    },
  ],
  ordenes_detalle: [
    {
      IdProdServOK: { type: String, require: true }, //"9001-64e148b5ae58"
      IdPresentaOK: { type: String, require: true }, //"9001-64e148b5ae58-64e148b5"(64e148b5: se extrae la precentacion que se desea desede la colecion)
      DesPresentaPS: { type: String },
      Cantidad: { type: Number },
      PrecioUniSinIVA: { type: Number },
      PrecioUniConIVA: { type: Number },
      PorcentajeIVA: { type: Number },
      MontoUniIVA: { type: Number },
      SubTotalSinIVA: { type: Number },
      SubTotalConIVA: { type: Number },
      pedidos_detalle_ps_estatus_f: [
        {
          _id: false,
        },
      ],
      _id: false,
    },
  ],
  detail_row: {
    Activo: { type: String, default: "S" },
    Borrado: { type: String, default: "N" },
    detail_row_reg: [
      {
        FechaReg: { type: Date, default: Date.now },
        UsuarioReg: { type: String },
        _id: false,
      },
    ],
    _id: false,
  },
});

const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;

const conn = obtenerConexion(dbName, dbCluster);

const model = obtenerModelo(
  "ordenes",
  ordenesSchemaPWA,
  conn,
  dbName,
  dbCluster
);

export default model;
