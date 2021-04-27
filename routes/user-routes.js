const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

//Devolvemos un views con todos los escaladores.
//LLamamos al modelo de Climber, y buscar los escaladores
router.get("/", (req, res) => {
    User.find({})
        .then((users) => {
            console.log(users)
            res.render("partners", { users }); //Renderizado de esa lista de escaladores, primer parametro es la lista  y el segundo la informacion que le queramos pasar
        })
        .catch((error) => console.error(error));
});
//Esta ruta debe ir antes porque /create es fijo, y el /:id es variable.
module.exports = router;
