import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Mi primer servidor con express");
})

app.get('/home', (req, res) => {
    res.send("Bienvenido");
})


const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));