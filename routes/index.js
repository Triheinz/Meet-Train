const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User.model');
const { isLoggedOut } = require('../middleware');

const saltRounds = 10;

//En este caso no se hace una instancia de la aplicacion, porque ya la tenemos en app.js aquí necesitaremos un router, un elemento que gestiona las diferentes rutas de este fichero.
const express = require('express');
const router = express.Router(); //Lo importamos de express, vamos a crear una instancia de un Router, de  un elemento que nos permite gestionar las rutas de la aplicación

// router.get("/", (req, res) => {
//     res.render('index'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
// })

router.get('/signup', (req, res) => {
    res.render('signup'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
});

router.get('/login', (req, res) => {
    res.render('login'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
});

router.get('/whoRwe', (req, res) => {
    res.render('whoRwe'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.render('signup', {
            errorMessage: 'Username and password are required.',
        });
    }

    // const regularExpresion = new RegExp('');
    // regularExpresion.test(password)

    if (password.length < 3) {
        res.render('signup', {
            errorMessage: 'Password should have at least 3 characters',
        });
    }

    User.findOne({ username }).then((user) => {
        if (user) {
            return res.render('signup', { errorMessage: 'User already exists.' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);

        User.create({ username, password: hashPass })
            .then((newUser) => {
                // return res.redirect('/');
                req.login(newUser, (error) => {
                    if (error) {
                        next(error);
                    }
                    return res.redirect('/private-routes/profile');
                });
            })
            .catch((error) => {
                console.log(error);
                return res.render('signup', {
                    errorMessage: 'Server error. Try again.',
                });
            });
    });
});

router.get('/login', isLoggedOut, (req, res) => {
    res.render('login');
});

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/private/profile',
        failureRedirect: '/login',
        passReqToCallback: true,
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = router; //exportar el router, lo debemos importar a app.js