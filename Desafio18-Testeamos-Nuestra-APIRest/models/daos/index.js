let mensajeDao;

const { default: MensajesDaosMongoDb } = await import('./mensajes/MensajesDaosMongodb.js');
mensajeDao = new MensajesDaosMongoDb();

await mensajeDao.connect();

export { mensajeDao }

