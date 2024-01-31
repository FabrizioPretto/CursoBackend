import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    return httpResponse.NotFound(res, error.message);
}