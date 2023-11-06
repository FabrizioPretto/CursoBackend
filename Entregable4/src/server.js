import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

//recibe el motor de plantillas
app.engine('handlebars', handlebars.engine());//handlebars.engine recibe toda la funcionalidad del motor de plantillas.
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);

app.listen(8080, () => console.log("Server ok on port 8080"));

