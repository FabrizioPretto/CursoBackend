import { Schema, model } from "mongoose";

//export const cartCollection = "carts";

export const cartSchema = new Schema({

    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                default: []
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
});

cartSchema.pre('find', function () {
    this.populate('products');
})

export const CartModel = model('carts', cartSchema);