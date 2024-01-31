const httpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
}

export const errorsDictionary = {
    //Products
    ERROR_CREATE_PRODUCT: 'Error creating product',
    ERROR_ADD_TO_CART: 'Error adding product to cart',
    ERROR_MOCK_PRODUCTS: 'Error creating mock products',
    PRODUCT_NOT_FOUND: 'Product not found',
    ERROR_UPDATE_PRODUCT: 'Error updating product',
    ERROR_DELETE_PRODUCT: 'Error deleting product',
    ERROR_GET_BY_ID: 'Get by id failed',
    ERROR_ITEM_NOT_FOUND: 'Item not found',
    //Carts
    ERROR_DELETE_CART: 'Error deleting cart',
    ERROR_ADD_PRODUCT_TO_CART: 'Error adding product to cart',
    ERROR_REMOVE_PRODUCT_FROM_CART: 'Error removing product from cart',
    ERROR_UPDATE_QUANTITY_IN_CART: 'Error updating product quantity in cart',
    ERROR_EMPTYING_CART: 'Error emptying cart',
    ERROR_CART_NOT_FOUND: 'Cart not found',
    //Users
    ERROR_USER_EXISTS: 'User already exists',
    ERROR_LOGIN: 'Error login/generate token',
    //Tickets
    ERROR_GENERATE_TICKET: 'Error generate ticket'
}


export class HttpResponse {
    Ok(res, data) {
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: 'Success',
            data: data
        })
    }

    NotFound(res, data) {
        return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            message: 'Not Found',
            error: data
        })
    }

    Unauthorized(res, data) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: httpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
            error: data
        })
    }

    Forbidden(res, data) {
        return res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.FORBIDDEN,
            message: 'Forbidden',
            error: data
        })
    }

    ServerError(res, data) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: data
        })
    }
}