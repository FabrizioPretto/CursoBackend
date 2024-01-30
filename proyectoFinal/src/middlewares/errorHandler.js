import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    console.log('Pasó por el middleware');
    return httpResponse.NotFound(res, error.message);
}