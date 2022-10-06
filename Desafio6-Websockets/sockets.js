const { Server } = require("socket.io");

let io;

const productos = [
    {
        title: 'PlayStation 3',
        price: 60000,
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg',
      },
      {
        title: 'PlayStation 4',
        price: 130000,
        thumbnail: 'https://th.bing.com/th/id/OIP.HXa-kFjqTztbJMpplOafPwHaHa?pid=ImgDet&rs=1',
      },
      {
        title: 'PlayStation 5',
        price: 250000,
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/PlayStation_5_and_DualSense_with_transparent_background.png/1200px-PlayStation_5_and_DualSense_with_transparent_background.png',
      },
      {
        title: 'Xbox 360',
        price: 50000,
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Xbox-360-Consoles-Infobox.png',
      },
    ];

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


module.exports = {
      initSocket,
      productos
};