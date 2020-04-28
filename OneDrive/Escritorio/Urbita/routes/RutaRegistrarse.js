var express = require('express');
var router = express.Router();
var ControlRegistrarse = require("../Controllers/ControlRegistrarse");

router.get('/', function(req, res,) {
    res.render("VistaRegistrarse",{error:""});
});

router.post("/",ControlRegistrarse.Guardar);

module.exports = router;
