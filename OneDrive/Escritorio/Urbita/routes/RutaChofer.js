var express = require('express');
var router = express.Router();
var ControlChofer = require("../Controllers/ControlChofer");


router.get('/:id',ControlChofer.Consultar);

router.get('/:id/VerViajes',ControlChofer.Listar);

router.get('/:id/Editar',ControlChofer.ConsultarEditar);

router.post('/:id/Editar',ControlChofer.Actualizar);

router.get('/:id/CrearAuto',ControlChofer.ConsultarCrearAuto);

router.post('/:id/CrearAuto',ControlChofer.ConsultarAutoExiste)



module.exports = router;

