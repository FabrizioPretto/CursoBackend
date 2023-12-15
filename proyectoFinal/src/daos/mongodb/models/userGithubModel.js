import { Schema, model } from "mongoose";

const userGithubSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
})

export const UserModel = model('usersGithub', userGithubSchema);