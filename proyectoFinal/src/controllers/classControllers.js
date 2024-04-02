import { createResponse } from "../utils/utils.js";
import { HttpResponse, errorsDictionary } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export default class Controllers {

    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const items = await this.service.getAll();
            if (!items) return httpResponse.NotFound(res, errorsDictionary.ERROR_ITEM_NOT_FOUND);
            else return httpResponse.Ok(res, items);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) return httpResponse.NotFound(res, errorsDictionary.ERROR_ITEM_NOT_FOUND);
            else return httpResponse.Ok(res, item);
        } catch (error) {
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            const newItem = await this.service.create(req.body)
            if (!newItem) return httpResponse.ServerError(res, errorsDictionary.ERROR_CREATE_PRODUCT);
            else return httpResponse.Ok(res, newItem);
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) return httpResponse.ServerError(res, errorsDictionary.ERROR_UPDATE_PRODUCT);
            const itemUpd = await this.service.update(id, req.body);
            return httpResponse.Ok(res, itemUpd);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) return httpResponse.ServerError(res, errorsDictionary.ERROR_DELETE_PRODUCT);
            const itemDel = await this.service.delete(id);
            return httpResponse.Ok(res, itemDel);
        } catch (error) {
            next(error);
        }
    }

}