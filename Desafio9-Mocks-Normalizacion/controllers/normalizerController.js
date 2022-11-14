const { schema, normalize } = require ('normalizr');
function normalizarMensaje (data) {
    let messageModel = {
        id: 'mensaje',
        mensaje: [],
    };
    data.forEach(item => {
        messageModel.mensaje.push({
            id: item._id.toString(),
            text: {
                text: item.text.text,
                date: item.text.date,
            },
            author: {
                email: item.author.email,
                nombre: item.author.nombre,
                apellido: item.author.apellido,
                edad: item.author.edad,
                alias: item.author.alias,
                avatar: item.author.avatar,
            },
        })
    });

    //Definimos un esquema de autores
    const autorScheme = new schema.Entity('author', {}, { idAttribute: 'email' });
 
    //Definimos un esquema de mensajes
    const mensajeScheme = new schema.Entity('mensaje', {
        author: autorScheme,
    });
    const allMensajes = new schema.Entity('mensaje', {
        text: [mensajeScheme],
    });

    const normalizedMensajes = normalize(messageModel, allMensajes);

    return normalizedMensajes;
};

module.exports = normalizarMensaje