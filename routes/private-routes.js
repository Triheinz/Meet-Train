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
    const { id } = req.params;
    User.findOne({ _id: req.user._id })
        .then(user => {
            res.render('edit', { user: req.user, access: req.user });
        })
        .catch((error) => console.error(error));
});

router.post('/edit', uploader.single('image'), (req, res, next) => {
    const { username, password, email, description, age, city, sport, role, review } = req.body;
    if (req.file) {
        User.findOneAndUpdate({ _id: req.user._id }, {
          username: username,
          image: req.file.path,
          password: password,
          email: email,
          description: description,
          age:age,
          city: city,
          sport: sport,
          role: role,
          review }, { new: true })
            .then(() => {
                res.redirect('/private/profile');
            })
            .catch((error) => next(error));
    }
    res.render('profile', { user: req.user, access: req.user });
});


module.exports = router;
