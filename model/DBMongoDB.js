import mongoose from "mongoose";
import config from "../config.js";


class DBMongoDB {
    
    static READY_STATE_DISCONECTED = 0;
    static READY_STATE_CONECTED = 1;

    static propiety = '_id';

    static getObjectWidthId(object) {
        if(Array.isArray(object)) {
            object.forEach(element => {
                element.id = element[DBMongoDB.propiety];
                delete element[DBMongoDB.propiety];
            });
        } else {
            object.id = object[DBMongoDB.propiety];
            delete object[DBMongoDB.propiety];
        }
        return object;
    }

    static async connectMongoDB() {
        try{
            if(mongoose.connection.readyState === DBMongoDB.READY_STATE_CONECTED) {
                return true;
            }
            await mongoose.connect(config.MONGODB_CONECTION_STR, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: config.MONGODB_TIMEOUT
            })
            console.log('Conexión con MongoDB existosa!');
            return true;
        } catch (error) {
            console.error(`Error al intentar establecer la conexión con MongoDB. Detalle: ${error.message}`);
            return false;
        }
    }




};

export default DBMongoDB;