//En este caso no se hace una instancia de la aplicacion, porque ya la tenemos en app.js aquí necesitaremos un router, un elemento que gestiona las diferentes rutas de este fichero.
const express = require('express');
const router = express.Router(); //Lo importamos de express, vamos a crear una instancia de un Router, de  un elemento que nos permite gestionar las rutas de la aplicación

// router.get("/", (req, res) => {
//     res.render('index'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
// })

router.get("/signup", (req, res) => {
    res.render('signup'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
})

router.get("/login", (req, res) => {
    res.render('login'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
})

router.get("/whoRwe", (req, res) => {
    res.render('whoRwe'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
})

module.exports = router; //exportar el router, lo debemos importar a app.js