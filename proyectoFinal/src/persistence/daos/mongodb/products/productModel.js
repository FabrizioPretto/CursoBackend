import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export const productCollection = "products";

export const productSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    code: { type: Number, required: true, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    user: { type: String, default: 'adminCoder@coder.com' },
    role: { type: String, default: 'admin' }
})

productSchema.plugin(mongoosePaginate);

export const ProductsModel = model(productCollection, productSchema);