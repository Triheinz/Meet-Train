const express = require('express');
const path = require('path');
const hbs = require('hbs');


module.exports = (app) => {
    app.set('views', path.join(__dirname, '..', 'views')) //Donde estan los views estan en la carpeta views
    app.set('view engine', 'hbs'); // Motor de renderizado, motor de templates va a ser Handelbars
    hbs.registerPartials(__dirname + '/views/partials'); //Donde estan los partials, tenemos que requerir hbs, lo hacemos en la linia 4.
    app.use(express.static(path.join(__dirname, '..', 'public'))); // En que carpeta estan los estaticos, en este caso en el public, son estaticos me refiero a css, imagenes...
}