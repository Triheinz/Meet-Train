//Middleware y setup config Middlewares es un concepto muy importante al desarrollar sobre Node.js, la plataforma para utilizar a javascript en el lado del servidor.

const bodyParser = require('body-parser'); //Constante del paquete de body-parser
const cookieParser = require('cookie-parser');
const logger = require('morgan');

module.exports = (app) => {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ //Traduce la informacion y Nos permite utilizar la informacion del formulario y devolverla en un objeto.
        extended: true // sirve para que acepte mas datos no solo strings, si no lo pones todo te vendria como un string
    }))
    app.use(cookieParser());
}