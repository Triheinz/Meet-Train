const express = require('express');
const Groups = require('../models/Groups.model');
const router = express.Router();


router.get('/', (req, res) => {
    Groups.find({})
        .then((groups) => {
            console.log(groups);
            res.render('groups', { user: req.user, access: req.user, groups }); //Renderizado de esa lista de escaladores, primer parametro es la lista  y el segundo la informacion que le queramos pasar
        })
        .catch((error) => console.error(error));
});
//Esta ruta debe ir antes porque /create es fijo, y el /:id es variable.
module.exports = router;
