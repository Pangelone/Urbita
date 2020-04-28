
let db = require ("../database/models");

let ControlIndex = {
    Loggin: function (req, res) {
        db.Usuarios.findAll({
            where:{
                email: req.body.email2,
                password: req.body.contraseña2,
            }
        })
        .then(function(Usuarios,error){
            if (Usuarios.length == 0){
                return res.render("VistaIndex",{Usuarios:Usuarios,error:"El Email y/o contraseña ingresados no son validos."}); 
            }                
            else if (Usuarios[0].name == "Pasajero"){
                res.redirect("/Pasajero/" + Usuarios[0].id);
            }
            else{
                res.redirect("/Chofer/" + Usuarios[0].id);
            }
        });
    },
}
module.exports = ControlIndex;

