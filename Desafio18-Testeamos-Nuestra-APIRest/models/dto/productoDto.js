export default class productoDto {
    constructor(producto) {
        this.id = producto.id || producto._id
        this.title = producto.title
        this.thumbnail = producto.thumbnail
        this.price = producto.price
        this.stock = producto.stock;
    }
}