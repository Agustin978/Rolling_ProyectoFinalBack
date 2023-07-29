import { Schema, model } from "mongoose";

const pedidoSchema = new Schema({
    idUsuario: {
        type:String,
        required:true
    },
    idProducto: {
        type:String,
        required:true
    },
    nombreUsuario: {
        type:String,
        minLength: 4,
        maxLength: 14,
        required:true
    },
    email: {
        type:String,
        minLength: 8,
        maxLength: 40,
        required:true
    },
    nombreProducto: {
        type:String,
        minLength: 2,
        maxLength: 200,
        required:true
    },
    precioUnidad: {
        type:Number,
        min:50,
        max:10000,
        required: true
    },
    imagen: {
        type: String,
    },
    fechaPedido: {
        type: String,
        required: true
    },
    detallePedido: {
        type: String,
        minLength: 4,
        maxLength: 200
    },
    cantidad: {
        type: Number,
        min: 1,
        max: 50
    },
    direccion: {
        type: String,
        minLength: 5,
        maxLength: 100,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

const Pedido = model('pedido', pedidoSchema);
export default Pedido;