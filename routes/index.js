const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User.model');
const { isLoggedOut } = require('../middleware');
const fileUploader = require('../config/cloudinary.config');
const saltRounds = 10;

//En este caso no se hace una instancia de la aplicacion, porque ya la tenemos en app.js aquí necesitaremos un router, un elemento que gestiona las diferentes rutas de este fichero.
const express = require('express');
const router = express.Router(); //Lo importamos de express, vamos a crear una instancia de un Router, de  un elemento que nos permite gestionar las rutas de la aplicación

router.get('/', isLoggedOut, (req, res) => {
    res.render('index', {notAccess: req.user}); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
});

router.get('/signup', isLoggedOut, (req, res) => {
    res.render('signup', { notAccess: req.user }); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
});

router.post('/signup', fileUploader.single('image'), (req, res) => {
  const {
    username,
    password,
    email,
    age,
    city,
    genero,
    sports,
    description,
  } = req.body;

  if (!username || !password) {
    res.render('signup', {
      errorMessage: 'Username and password are required.',
      notAccess: req.user,
    });
  }

  if (password.length < 3) {
    res.render('signup', {
      errorMessage: 'Password should have at least 3 characters',notAccess: req.user

    });
  }
  console.log('dataBase.findOne');

  User.findOne({ username }).then((user) => {
    console.log('insideFinOne');
    if (user) {
      return res.render('signup', { errorMessage: 'User already exists.',notAccess: req.user  });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);
    const picture = req.file.path;

    User.create({
      username,
      password: hashPass,
      email,
      age,
      city,
      genero,
      sports,
      description,
      picture,
    })
      .then((newUser) => {
        console.log('user created');
        req.login(newUser, (error) => {
          if (error) {
            next(error);
          }
          return res.redirect('/private/profile');
        });
      })
      .catch((error) => {
        console.log(error);
        return res.render('signup', {
          errorMessage: 'Server error. Try again.',
          notAccess: req.user,
        });
      })
    console.log('dataBase.findOne');
    });
  });

router.get('/login', isLoggedOut, (req, res) => {
    res.render('login'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('login', {
      errorMessage: 'Please enter username and password',
      notAccess: req.user,
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      console.log("user: ", user)
      if (!user) {
        res.render('login', {
          errorMessage: 'User not found',
          notAccess: req.user,
        });

        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (passwordCorrect) {
                console.log(req.session);

                req.session.currentUser = user;
                res.redirect('/');
            } else {
                res.render('login', {
                  errorMessage: 'Incorrect email or password',
                  notAccess: req.user,
                });
            }
        })
        .catch((err) => next(err));
    /* passport.authenticate('local', {
    successRedirect: '/private/profile',
    failureRedirect: '/login',
    passReqToCallback: true,
}) */
});

router.get('/whoRwe', (req, res) => {
    res.render('whoRwe'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router; //exportar el router, lo debemos importar a app.js
