export default class ProductReqDTO {
    constructor(product) {
        this.nombre = product.title,
            this.desripcion = product.description,
            this.precio = product.price,
            this.disponibilidad = product.stock
    }
}