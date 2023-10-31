import express from 'express';
//import { UserManager } from './manager/user.manager.js';
//const userManager = new UserManager('./users.json');
import userRouter from './routes/user.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

