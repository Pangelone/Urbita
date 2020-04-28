
let db = require ("../database/models");

let ControlRegistrarse = {

    Guardar: function (req, res) {
        db.Usuarios.findAll({
            where:{
                email: req.body.email,
            }
        })
        .then(function(Usuarios,error){
            if (Usuarios.length == 1){
                return res.render("VistaRegistrarse",{Usuarios:Usuarios,error:"El Usuario indicado ya se encontraba registrado."}); 
            }                
            else{
                db.Usuarios.create({
                    name: req.body.tipo,
                    first_name: req.body.nombre,
                    last_name: req.body.apellido,
                    identification_number: req.body.dni,
                    email: req.body.email,
                    password: req.body.contraseña,
                    avatar: req.body.urlimagen,
                });
            res.redirect("/");
            }
        });
    },


}         

module.exports = ControlRegistrarse;