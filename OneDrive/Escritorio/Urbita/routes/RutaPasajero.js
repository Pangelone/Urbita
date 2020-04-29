var express = require('express');
var router = express.Router();
var ControlPasajero = require("../Controllers/ControlPasajero");

router.get('/:id',ControlPasajero.Consultar);

router.post('/:id',ControlPasajero.Finalizarviaje);

router.get('/:id/VerViajes',ControlPasajero.Listar);

router.get('/:id/Editar',ControlPasajero.ConsultarEditar);

router.post('/:id/Editar',ControlPasajero.Actualizar);

router.get('/:id/SolicitarViaje',ControlPasajero.SolicitarViaje);

router.post('/:id/SolicitarViaje',ControlPasajero.SolicitarViajePost);


module.exports = router;

