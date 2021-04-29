const express = require('express');
const Groups = require('../models/Groups.model');
const router = express.Router();


router.get('/', (req, res) => {
  Groups.find({})
    .then((groups) => {
      console.log(groups);
      res.render('groups', { groups });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
