const express = require('express');
const uploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRole } = require('../middleware');
const Groups = require('../models/Groups.model');
const User = require('../models/User.model');
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');



router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', {
        user: req.user,
        isAdmin: req.user.role === 'Admin',
        access: req.user,
    });
});

router.get('/groups', isLoggedIn, (req, res, next) => {
    console.log('req.user', req.user)
    Groups.find({})
        .then((groups) => {
            res.render('groups', { user: req.user, access: req.user, groups });
        })
        .catch((err) => console.log(err));
});

router.get('/crear-group', isLoggedIn, (req, res, next) => {
    res.render('crear-group', { user: req.user, });
});

router.post("/crear-group", fileUploader.single('image'), (req, res) => { //Recoje los datos del formulario
    const { name, description, email } = req.body; //Estas son las keys que hemos puesto en climber-create.
    // const picture = req.file;
    Groups.create({ name, description, email, image: req.file ? req.file.path : req.user.image, }) //Creamos un nuevo usuario en el modelo escalador.

    .then((newGroups) => {
            res.redirect('/private/groups');
        })
        .catch((error) => {
            console.log(error);
            return res.render('crear-group', {
                errorMessage: 'Server error. Try again.',
            });
        })
})

router.get('/:id/edit-group', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    Groups.findOne({ _id: id })
        .then(group => {
            res.render('edit-group', { user: req.user, access: req.user, group });
        })
        .catch((error) => console.error(error));
});

router.post('/:id/edit-group', uploader.single('image'), (req, res, next) => {
    const { name, description } = req.body;
    console.log(req)
    Groups.findByIdAndUpdate(req.params.id, {
        image: req.file ? req.file.path : req.user.image,
        description,
        name }, { new: true })
        .then((groups) => {
            res.redirect('/private/groups/');
        })
        .catch((error) => next(error));

    res.render('groups', { user: req.user, access: req.user });
});

router.post('/:id/delete', (req, res) => {
    const { id } = req.params; //Cojemos el id de la propia ruta.

    Groups.findOneAndDelete({ _id: id }) //Primer parametros es el id
        .then(() => {
            res.redirect("/private/groups"); //Luego redirigeme a /climbers.
        })
        .catch(error => console.error(error));
})

router.get('/partners', isLoggedIn, (req, res, next) => {
    User.find({})
        .then((users) => {
            res.render('partners', { user: req.user, access: req.user, users });
        })
        .catch((err) => console.log(err))

});

router.get('/edit', isLoggedIn, (req, res, next) => {
    res.render('edit', { user: req.user, access: req.user });
})

router.post('/edit', uploader.single('image'), (req, res, next) => {
    const { username, password, email, description, age, genero, city, sports } = req.body;
    console.log(genero)
    User.findOneAndUpdate({ _id: req.user._id }, {
            username: username,
            image: req.file ? req.file.path : req.user.image,
            password,
            email,
            description,
            age,
            genero,
            city,
            sport: sports,
        }, { new: true })
        .then(() => {
            res.redirect('/private/profile');
        })
        .catch((error) => next(error));


});

router.post('/:id/delete', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => console.error(error));
});


module.exports = router;
