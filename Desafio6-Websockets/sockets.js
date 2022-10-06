const { Server } = require("socket.io");

let io;

const productos = [];

function initSocket(httpServer) {
      io = new Server(httpServer);
      setEvents(io);
}

function setEvents(io) {
    io.on('connection', (socketClient) => {
        console.log('Se conecto un nuevo cliente con el id', socketClient.id);

        socketClient.emit('historyProducts', productos);

        socketClient.on('newProduct', (data) => {
            productos.push(data);
            io.emit('productNotification', data);
        });


        socketClient.on('disconnect', () => {
            console.log('Se desconecto el cliente con el id:', socketClient.id);
        });
      });
}


module.exports = {initSocket};