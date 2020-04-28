
let db = require ("../database/models");

let ControlChofer = {

    Consultar: function (req, res) {
        db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })
        
        .then(function(Usuarios,error){
            return res.render("VistaChofer",{Usuarios:Usuarios , error:""}); 
        });

    },
    

    ConsultarEditar: function (req, res) {
        db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })
        
        .then(function(Usuarios){
            return res.render("VistaEditarUsuario",{Usuarios:Usuarios}); 
        });

    },



    Actualizar: function (req, res) {

        db.Usuarios.update({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            avatar: req.body.urlimagen
            },
            {
            where: {
                id: req.params.id
            }
            }
        );
        res.redirect("/" + req.body.tipo + "/" + req.params.id);
    },

    ConsultarCrearAuto: function (req, res) {

        let ConsultaUsuario = db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })

        let ConsultaMarcas = db.Marcas.findAll()

        Promise.all([ConsultaUsuario,ConsultaMarcas])

            .then(function([Usuarios, Marcas, error]){
                return res.render("VistaCrearAuto",{Usuarios:Usuarios , Marcas:Marcas , error:""}); 
            });

    },



    ConsultarAutoExiste: function (req, res) {

        let ConsultaAuto = db.Autos.findAll({
            where:{
                user_id: req.params.id,
            }
        })

        let ConsultaUsuario = db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })

        let ConsultaMarca = db.Marcas.findAll()

        Promise.all([ConsultaUsuario,ConsultaAuto,ConsultaMarca])
        
        .then(function([Usuarios,Autos,Marcas,error]){
            if (Autos.length != 0){
                return res.render("VistaCrearAuto",{Usuarios:Usuarios,Autos:Autos, Marcas:Marcas , error:"Ya existe un vehiculo cargado."}); 
            }
            else{
                db.Autos.create({
                    user_id: req.params.id,
                    brand_id: req.body.Marca,
                    patent: req.body.Patente,
                    work_from_hour: req.body.Desde,
                    work_to_hour: req.body.Hasta,
                    });
                return res.render("VistaCrearAuto",{Usuarios:Usuarios, Marcas:Marcas , error:""}); 
            }
        });

    },
    
};      

module.exports = ControlChofer;