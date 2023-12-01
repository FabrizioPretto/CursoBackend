import { Schema, model } from "mongoose";

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
    thumbnail: { type: String, required: true }
})

export const ProductsModel = model(productCollection, productSchema);