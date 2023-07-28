import { Schema, model } from 'mongoose';

const productoSchema = new Schema({
    nombreProducto: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true
    },
    imagen: {
        type: String,
        required: true,
        match: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)$/,
    },
    precioNuevo: {
        type: Number,
        required: true,
        min: 50,
        max: 10000
    },
    precioAnterior: {
        type: Number,
        min: 50,
        max: 10000
    },
    descripcion: {
        type: String,
        minLength: 10,
        maxLength: 10000,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        enum: [
            'bebida caliente',
            'bebida fria',
            'bebida con alcohol',
            'entrada',
            'plato fuerte',
            'acompaniamientos',
            'postre'
        ]
    }
});

const Producto = model('producto', productoSchema);
export default Producto;
