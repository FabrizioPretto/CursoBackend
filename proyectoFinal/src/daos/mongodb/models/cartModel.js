import { Schema, model } from 'mongoose';

export const cartSchema = new Schema({

    products: [
        {
            _id: false,
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
            },
            quantity: {
                type: Number,
                default: 1
            },
        },
    ],
});

cartSchema.pre('find', function () {
    this.populate('products.product');
});

export const CartModel = model('carts', cartSchema);

