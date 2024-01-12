import { connect } from 'mongoose';
import 'dotenv/config';

const connectionString = process.env.MONGO_URL;


export const initMongoDB = async () => {
    try {
        await connect(connectionString);
        console.log("Conectado a la base de datos de MongoDB");;
    } catch (error) {
        console.log(error);
    }
}



/*import mongoose from "mongoose";
const MONGO_URL = 'mongodb://127.0.0.1:27017/products';
export const MONGO_ATLAS_URL = 'mongodb+srv://fgpretto:F4br1z10@pretto.aiozw0c.mongodb.net/ecommerce?retryWrites=true&w=majority'

try {
    await mongoose.connect(MONGO_ATLAS_URL);
    console.log("Conectado a la base de datos de MongoDB");;
} catch (error) {
    console.log(error);
}*/

