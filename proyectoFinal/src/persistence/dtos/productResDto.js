export default class ProductResDTO {
    constructor(product) {
        this.nameProd = product.title,
            this.descriptionProd = product.description,
            this.priceProd = product.price,
            this.stockProd = product.stock,
            this.user = product.user,
            this.role = product.role
    }
}