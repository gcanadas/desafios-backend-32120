const config = {
    fileSystem: {
      path: './DB'
    },
    mongoDB: {
      URI: 'mongodb://localhost:27017/mensajes'
    },
    dao: {
      persistencia: process.env.PERSISTENCIA || 'mongo'
    },
};

module.exports = { config };