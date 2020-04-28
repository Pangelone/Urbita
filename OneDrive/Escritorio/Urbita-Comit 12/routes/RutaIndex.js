var express = require('express');
var router = express.Router();
var ControlIndex = require("../Controllers/ControlIndex");

router.get('/', function(req, res,) {
    res.render("VistaIndex",{error:""});
});

router.post("/",ControlIndex.Loggin);

module.exports = router;




