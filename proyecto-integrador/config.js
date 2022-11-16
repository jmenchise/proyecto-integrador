
const PERSISTENCE_TYPE = {
    TYPE_MONGODB: 'MONGO_DB',
    TYPE_MEM: 'MEMORY',
    TYPE_FILE: 'FILE'
}


const config = {
    PORT : 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB,
    MONGODB_CONECTION_STR: 'mongodb+srv://jmenchise:35205354@cluster0.kdpjpge.mongodb.net/ecommerce?retryWrites=true&w=majority',
    // MONGODB_CONECTION_STR: 'mongodb://localhost/ecommerce',
    MONGODB_TIMEOUT: 7000
};



export{ config as default, PERSISTENCE_TYPE,};
