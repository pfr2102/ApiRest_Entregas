import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';


const entregasSchemaPWA = new mongoose.Schema({
	id_ordenOK: { type: String },
	id_domicilioOK: { type: String },
	id_proveedorOK: { type: String },
	usuario: {
		_id: false,
		id_usuarioOK: {type: String},
		nombre: {type: String},
		correo_electronico: {type: String},
		telefono: {type: String},
	},
	envio: {
		_id: false,
		fecha_pedido: {type: String},
		metodo_envio: {type: String},
		direccion_entrega: {
			calle: {type: String}, 
			ciudad: {type: String},
			codigo_postal: {type: String},
			estado: {type: String},
			pais: {type: String},
		},
		productos: [
			{
				_id: false,
				id_producto: {type: String},
				nombre: {type: String},
				cantidad: {type: String},
				precio_unitario: {type: String},
			},
		],
		costo_envio: {type: String},
		codigo_seguridad: {type: String},
	},
	empresa_logistica: {
		nombre: {type: String},
		contacto: {
			nombre:{type: String},
			telefono:{type: String},
			correo_electronico: {type: String},
		},
	},
	rastreo: {
		estado_actual: {type: String},
		fecha_actualizacion: {type : Date, default: Date.now},
		detalles: [
			{
				estado: {type: String},
				fecha: {type : Date, default: Date.now},
				ubicacion: {type: String},
			}
		]
	},
	devolucion: {
		estado: {type: String},
		motivo: {type: String},
		fecha_solicitud: {type : Date, default: Date.now},
		detalles: {type: String},
		id_envio_dev: {type: String},
	}
});


//FIC: *******************************************************************
const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;
  
const conn =  obtenerConexion(dbName, dbCluster);
	
const model = obtenerModelo('Entregas', 
						  config.PLATFORM==='PWA' ? entregasSchemaPWA : entregasSchemaPWA,
						  conn, 
						  dbName, 
						  dbCluster);

export default model;

/* export default mongoose.model(
	'cat_institutos',
	config.PLATFORM==='PWA' ? institutesSchemaPWA : institutesSchemaWEB,
	'cat_institutos'
);
 */
