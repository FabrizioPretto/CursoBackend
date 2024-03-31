import app from '../../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';

describe('Test integrales para router products', () => {

    beforeAll(async () => {
        // Conectar a la base de datos
        await mongoose.connect('mongodb+srv://fgpretto:F4br1z10@pretto.aiozw0c.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión establecida con la base de datos');

        // Eliminar la colección si existe
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        if (collectionNames.includes("products")) {
            await mongoose.connection.collections["products"];
        } else {
            console.log("La colección 'products' no existe.");
        }
    });



    test('[POST] /api/products', async () => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.number.int({ min: 1, max: 100 }),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.productAdjective(),
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU"
        };
        const response = await request(app).post('/api/products').send(doc);
        //console.log("Response: ", response.body.data);
        const id = response.body.data._id;
        const titleResponse = response.body.data.title;
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data).toHaveProperty('_id');
        expect(titleResponse).toBe(doc.title);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.title).toEqual(doc.title);
    });

    test('[GET] /api/products', async () => {
        const response = await request(app).get('/api/products');
        const productName = response.body.payload[0].title;
        //console.log("Response: ", response.body.payload);
        expect(response.statusCode).toBe(200);
        expect(response.body.payload).toBeInstanceOf(Array);
        expect(productName).toBeDefined();
    });

    test('[PUT] /api/products/:id', async () => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.number.int({ min: 1, max: 100 }),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.productAdjective(),
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU"
        };

        const response = await request(app).post('/api/products').send(doc);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const newDoc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.number.int({ min: 1, max: 100 }),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.productAdjective(),
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU"
        }

        const responsePut = await request(app).put(`/api/products/${id}`).send(newDoc);
        const newTitle = responsePut.body.data.title;
        expect(newTitle).toBeDefined();
        expect(responsePut.status).toBe(200);
        expect(responsePut.body.data).toBeInstanceOf(Object);
        expect(responsePut.body.status).toBeDefined();

    })

    test('[DELETE] /api/products/:id', async () => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.number.int({ min: 1, max: 100 }),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.productAdjective(),
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU"
        };

        const response = await request(app).post('/api/products').send(doc);
        const id = response.body.data._id;
        expect(id).toBeDefined();
        expect(response.statusCode).toBe(200);

        const delResponse = await request(app).delete(`/api/products/${id}`).send(doc);
        expect(delResponse.status).toBe(200);
        //expect(response.body.data._id).toBeNaN();

        //expect(NaN).toBeNaN();
        //expect(1).not.toBeNaN()
    })
});

describe('Test integrales para router carts', () => {
    beforeAll(async () => {
        // Conectar a la base de datos
        await mongoose.connect('mongodb+srv://fgpretto:F4br1z10@pretto.aiozw0c.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión establecida con la base de datos');

        // Eliminar la colección si existe
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        if (collectionNames.includes("products")) {
            await mongoose.connection.collections["carts"];
        } else {
            console.log("La colección 'carts' no existe.");
        }
    });

    test('[GET] /api/carts', async () => {
        const response = await request(app).get('/api/carts');
        const cartid = response.body.data[0]._id;
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data).toBeDefined();
        expect(cartid).toBeDefined();
    })

})































/*
import app from '../../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';

describe('Test integrales para products', () => {

    beforeAll(async () => {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        if (collectionNames.includes("productsTest")) {
            await mongoose.connection.collections["productsTest"].drop();
        } else {
            console.log("La colección 'productsTest' no existe.");
        }
    });

    test('[POST] /api/products', async () => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.commerce.isbn(3),
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.productAdjective(),
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU"
        };
        const response = await request(app).post('/api/products').send(doc);
        console.log("Response: ", response.doc);
    });

    test('Otro test', async () => { });
});*/