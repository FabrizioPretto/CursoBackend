import express from 'express';
import { UserManager } from './manager/user.manager.js';

const userManager = new UserManager('./users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    try {
        const users = await userManager.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.post('/users', async (req, res) => {
    try {
        //const {firstname, lastaname, username, password} = req.body -->Destructuring
        const user = { ...req.body };
        const userCreated = await userManager.createUser(user);
        const { id, firstname, lastname, username } = userCreated;
        const userResponse = {
            firstname, lastname, username
        }
        res.status(200).json(userResponse);
        //res.status(password, salt, ...userCreated)
    } catch (error) {
        res.status(500).json(error.message);
    }
})


app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userManager.getUsersById(Number(id))
        if (!user) res.status(404).json({ message: 'User not found' });
        else res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const user = { ...req.body }
        const { id } = req.params;
        const idNumber = Number(id);
        const userOk = await userManager.getUsersById(Number(id));
        if (!userOk) res.status(404).json({ message: 'User not found' });
        else
            await userManager.updateUser(user, idNumber);
        res.status(200).json({ message: `User id: ${id} updated` })
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = Number(id);
        await userManager.deleteUser(idNumber);
        res.json({ message: `User id: ${id} deleted` });

    } catch (error) {
        res.status(500).json(error.message);
    }
})

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

