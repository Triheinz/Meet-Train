const express = require('express');
const Groups = require('../models/Groups.model');
const router = express.Router();

//Devolvemos un views con todos los escaladores.
//LLamamos al modelo de Climber, y buscar los escaladores
router.get('/', (req, res) => {
  Groups.find({})
    .then((groups) => {
      console.log(groups);
      res.render('index', { groups }); //Renderizado de esa lista de escaladores, primer parametro es la lista  y el segundo la informacion que le queramos pasar
    })
    .catch((error) => console.error(error));
});
//Esta ruta debe ir antes porque /create es fijo, y el /:id es variable.
module.exports = router;
