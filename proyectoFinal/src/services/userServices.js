import { UserManagerMondoDB } from "../daos/mongodb/userManagerMongodb.js";
const userDao = new UserManagerMondoDB();

//export default class UserServices {

export const findByEmail = async (email) => {
    return await userDao.getUserByEmail(email);
}


export const register = async (user) => {
    try {
        const { email } = user;
        const exists = await userDao.getUserByEmail(email);
        if (!exists) return await userDao.register(user);
        else return false;
    } catch (error) {
        console.log(error);
    }
}



export const login = async (email, password) => {
    try {
        const user = { email, password };
        const userExists = await userDao.login(user);
        if (!userExists) return false;
        else return userExists;
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (id) => {
    try {
        const response = await userDao.getUserById(id);
        if (response) return response;
        else return false;
    } catch (error) {
        console.log(error);
    }
}