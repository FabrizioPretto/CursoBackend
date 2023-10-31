

export const productValidator = async (req, res, next) => {

    if (req.body.title === undefined || req.body.title === "") throw new Error("Por favor ingrese un nombre distinto de vacío");
    if (req.body.description === undefined || req.body.description === "") throw new Error("Por favor ingrese una descripción distinta de vacío");
    if (await this.existCode(req.body.code) === true) throw new Error("El código ya existe. Ingrese uno diferente para el nuevo producto");
    if (req.body.code === "") throw new Error("Por favor ingrese un código distinto de vacío");
    if (req.body.price === undefined || req.body.price <= 0) throw new Error("Por favor ingrese un precio mayor a $0");
    if (req.body.stock === undefined || req.body.stock <= 0) throw new Error("Por favor ingrese un stock mayor a 0");
    if (req.body.category === undefined || req.body.category === "") throw new Error("Por favor ingrese una categoría distinta de vacío");
    next();
}