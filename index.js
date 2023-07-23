import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from "dotenv";

dotenv.config();
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
app.use(morgan()); //Nos aporta informacion adicional en la terminal

//Ingreso de rutas