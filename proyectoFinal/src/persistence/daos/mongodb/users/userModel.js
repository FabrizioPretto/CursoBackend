import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        //default: '1234',
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    last_connection: {
        type: Date,
        default: Date.now
    },
    isGithub: {
        type: Boolean,
        default: false
    },
    isGoogle: {
        type: Boolean,
        default: false
    }
})

export const UserModel = model('users', userSchema);