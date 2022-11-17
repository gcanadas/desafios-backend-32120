let Mensaje;

(async function(){
    try{
        const { default: MensajesDaosMongoDb } = await import(
            './mensajes/MensajesDaosMongodb.js'
        );
        Mensaje = new MensajesDaosMongoDb();
        
        await Mensaje.connect();
    } catch(err) {
        console.error(err.message);
    }
})();
module.exports = Mensaje;

