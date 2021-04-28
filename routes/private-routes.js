const express = require('express');
const uploader = require('../config/cloudinary.config');
const { isLoggedIn, checkRole } = require('../middleware');
const Groups = require('../models/Groups.model');
const User = require('../models/User.model');
const router = express.Router();


router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', {
        user: req.user,
        isAdmin: req.user.role === 'Admin',
        access: req.user,
    });
});

router.get('/groups', isLoggedIn, (req, res, next) => {
    Groups.find({})
        .then((groups) => {
            res.render('groups', { user: req.user, access: req.user, groups });
        })
        .catch((err) => console.log(err));
});

router.get('/crear-group', isLoggedIn, (req, res, next) => {
    res.render('crear-group', { user: req.user, access: req.user });
});

router.get('/edit-group', isLoggedIn, (req, res, next) => {
    res.render('edit-group', { user: req.user, access: req.user });
});

router.post('/edit-group', uploader.single('image'), (req, res, next) => {
    const { username } = req.body;
    if (req.file) {
        // User.findOneAndUpdate({ _id: req.user._id }, { username, profile_pic: req.file.path}, )
        Groups.findOneAndUpdate({ _id: req.groups._id }, { members: req.user.role === 'Admin', image: req.file.path }, { new: true })
            .then(() => {
                res.redirect('/private/edit-group');
            })
            .catch((error) => next(error));
    }
    res.render('signup', { user: req.user, access: req.user });
});

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
<<<<<<< HEAD
    const { username, password, email, description, age, genero, city, sport, review } = req.body;
    if (req.file) {
        User.findOneAndUpdate({ _id: req.user._id }, {
                username: username,
                image: req.file.path,
                password,
                email,
                description,
                age,
                genero,
                city,
                sport,
                review
            }, { new: true })
            .then(() => {
                res.redirect('/private/profile');
            })
            .catch((error) => next(error));
    }
    res.render('edit', { user: req.user });
=======
    const { username, password, email, description, age, genero, city, sports} = req.body;
        console.log(genero)
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            username: username,
            image: req.file ? req.file.path : req.user.image,
            password,
            email,
            description,
            age,
            genero,
            city,
            sport: sports,
          },
          { new: true }
        )
          .then(() => {
            res.redirect('/private/profile');
          })
          .catch((error) => next(error));


>>>>>>> 08cd0c5d73d83a20cfd5badb9fb654cca51913c6
});


module.exports = router;