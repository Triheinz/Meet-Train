// Conexion a la base datos

const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err);
    });