const users = require('../data'); //Requiriendo lo que hay en el fichero data.js
const User = require('../models/User.model'); //modelo
const mongoose = require('mongoose'); //Paquete para conectarme a la base de datos
const DB_NAME = 'meet-train-app'; //nombre de la base de datos que se va a crear.

mongoose.connect(`mongodb://localhost/${DB_NAME}`) //Nos conectamos a la base de datos y nos devuelve una promesa.
    .then(() => { // Aquí estamos 100% seguros que estamos conectados a la base de datos.
        console.log('Connected to database');
        //Cojemos el modelo escalador
        User.insertMany(users) //Insertar varios
            .then(users => {
                console.log(`${users.length} inserted`) //Cuantos escaladores tenemos en total.
            })
    })

.catch(error => console.error(error));