import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { fakerES as faker } from '@faker-js/faker';

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

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data });
}

export const generateMockProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.isbn(3),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.productAdjective(),
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1f…"
    }
}
