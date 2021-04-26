//Esta será nuestra aplicación
//Direccionamiento de express.
require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose') //Paquete para conectarme a la base de datos
const app = express() // Creamos la instancia de express
const DB_NAME = 'meet-train-app' // Nombre de la base de datos

//Database
require('./config/db.config')

//Middleware
require('./config/middleware.config')(app);

//ExpressView
require('./config/views.config')(app)
require('./config/session.config')(app);

//Importar el router.
const authRouter = require('./routes/index'); //importamos el router.
const userRouter = require('./routes/user-routes');
const groupRouter = require('./routes/group-routes');
const privateRouter = require('./routes/private-routes');


app.use('/', authRouter); //Usa este router, si las url empiezan por /, entra en index.js y a ver si encuentras alguna ruta que coincida, entonces si la encuentra la renderiza, renderiza el index hbs, pero esta ruta se enceuntra en index.js (no liarse con esto).
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/private', privateRouter);


//Ponemos a la aplicación a escuchar en el puerto 3000
app.listen(3000, () => console.log(`Listening on port 3000. http://localhost:3000`))