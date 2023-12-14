import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import { hashSync, genSaltSync, compareSync } from 'bcrypt';


//registro
export const createHash = (password) => {
    try {
        return hashSync(password, genSaltSync(10))
    } catch (error) {
        console.log(error);
    }
}

//login
export const isValidPass = (password, user) => {
    try {
        return compareSync(password, user.password)
    } catch (error) {
        console.log(error);
    }
}
