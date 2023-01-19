export default class mensajeDto {
    constructor(mensaje) {
        this.id = mensaje.id;
        this.author = {
            id: mensaje.author.email,
            nombre: mensaje.author.nombre,
            apellido: mensaje.author.apellido,
            edad: mensaje.author.edad,
            alias: mensaje.author.alias,
            avatar: mensaje.author.avatar,
        };
        this.text = mensaje.text;
        this.date = mensaje.date;
    }
}