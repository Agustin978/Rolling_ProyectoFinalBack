import { connect } from "mongoose";
import { MONGODB_URI } from "../config";

(async () => 
{
    try
    {
        const db = await connect(MONGODB_URI);
        console.log('Base de Datos conectada en '+db.connection.name);
    }catch(error)
    {
        console.log('A ocurrido un error al intentar conectarse a la base de datos. Informacion del error: '+error);
    }
})()