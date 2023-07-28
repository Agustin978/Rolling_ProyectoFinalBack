import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from "dotenv";
import './src/dataBase/DBConnection';
import usuarioRouter from './src/routes/usuarios.routes';
import pedidoRouter from './src/routes/pedidos.routes';
import productoRouter from './src/routes/productos.routes';

dotenv.config(); //Para leer variables de entorno
//Configuro un puerto
const app = express();
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => 
{
    console.log('Estoy en el puerto ', app.get('port'));
});

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev')); //Nos aporta informacion adicional en la terminal

//Ingreso de rutas
app.use('/apiusuarios', usuarioRouter);
app.use('/apipedidos', pedidoRouter);
app.use('/apiproductos', productoRouter); //ruta de productos

