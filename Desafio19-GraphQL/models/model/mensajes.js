export default class Mensaje {
    #id;
    #author;
    #message;
    #date;

    constructor(mensajeDto) {
        this.id = mensajeDto.id;
        this.author = {
            id: mensajeDto.email,
            nombre: mensajeDto.author.nombre,
            apellido: mensajeDto.author.apellido,
            edad: mensajeDto.author.edad,
            alias: mensajeDto.author.alias,
            avatar: mensajeDto.author.avatar,
        };
        this.message = mensajeDto.message;
        this.date = mensajeDto.date;
    }
    set id(value) {
        this.#id = value;
    }
    get id() {
        return this.#id;
    }
    set author(value) {
        this.#author = value;
    }
    get author() {
        return this.#author;
    }

    set message(value) {
        this.#message = value;
    }
    get message() {
        return this.#message;
    }
    set date(value) {
        this.#date = value;
    }
    get date() {
        return this.#date;
    }
}
