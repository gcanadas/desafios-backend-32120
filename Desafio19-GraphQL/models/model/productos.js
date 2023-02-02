export default class Producto {
    #id;
    #title;
    #price;
    #thumbnail;
    #stock;
    
    constructor(productoDto) {
        this.id = productoDto.id;
        this.title = productoDto.title;
        this.thumbnail = productoDto.thumbnail;
        this.price = productoDto.price;
        this.stock = productoDto.stock;
    }
    set id(value) {
        this.#id = value;
    }
    get id() {
        return this.#id;
    }
    set title(value) {
        this.#title = value;
    }
    get title() {
        return this.#title;
    }
    set price(value) {
        this.#price = value;
    }
    get price() {
        return this.#price;
    }
    set thumbnail(value) {
        this.#thumbnail = value;
    }
    get thumbnail() {
        return this.#thumbnail;
    }
    set stock(value) {
        this.#stock = value;
    }
    get stock() {
        return this.#stock;
    }
}