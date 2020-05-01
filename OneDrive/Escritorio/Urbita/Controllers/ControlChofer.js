
let db = require ("../database/models");

let ControlChofer = {

    Consultar: function (req, res) {
        db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })
        
        .then(function(Usuarios,error){
            return res.render("VistaChofer",{tipo:"Chofer",id:req.params.id,Usuarios:Usuarios , error:""}); 
        });

    },










    Listar: function (req, res) {

        let Marcas =  
        db.Marcas.findAll({
            include: [{association: "Autos"}]
        })
        let Usuarios =  
        db.Usuarios.findAll({
            include: [{association: "ViajesSolicitados"},{association: "Autos"}]
        })
        let Autos =  
        db.Autos.findAll({
            where:{
                user_id: req.params.id,
            },
            include: [{association: "Usuario"},{association: "Marca"},{association: "ViajesSolicitados"}]
        })
        let ViajesSolicitados =  
        db.ViajesSolicitados.findAll({
            include: [{association: "ViajesConfirmados"},{association: "Usuario"},{association: "Autos"}]
        })
        let ViajesConfirmados =  
        db.ViajesConfirmados.findAll({
            include: [{association: "ViajeSolicitado"},{association: "Comentarios"},{association: "Auto"}]
        })

        if (Autos.length > 0){
            Promise.all([Marcas,Usuarios,ViajesSolicitados,ViajesConfirmados,Autos])
            .then(function([Marcas,Usuarios,ViajesSolicitados,ViajesConfirmados,Autos]){
                return res.render("VistaVerViajes",{tipo:"Chofer",Usuarios:Usuarios,error:"",id:req.params.id,Marcas:Marcas,ViajesConfirmados:ViajesConfirmados,Autos:Autos,Usuarios:Usuarios,ViajesSolicitados:ViajesSolicitados}); 
            });
        }else{
            Promise.all([Marcas,Usuarios,ViajesSolicitados,ViajesConfirmados,Autos])
            .then(function([Marcas,Usuarios,ViajesSolicitados,ViajesConfirmados,Autos]){
                return res.render("VistaVerViajes",{tipo:"Chofer",suarios:Usuarios,error:"Aun has realizado ningun viaje.",id:req.params.id,Marcas:Marcas,ViajesConfirmados:ViajesConfirmados,Autos:Autos,Usuarios:Usuarios,ViajesSolicitados:ViajesSolicitados}); 
            });
        }


    },















    

    ConsultarEditar: function (req, res) {
        db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })
        
        .then(function(Usuarios){
            return res.render("VistaEditarUsuario",{tipo:"Chofer",id:req.params.id,Usuarios:Usuarios}); 
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
                return res.render("VistaCrearAuto",{tipo:"Chofer",id:req.params.id,Usuarios:Usuarios , Marcas:Marcas , error:""}); 
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
                return res.render("VistaCrearAuto",{tipo:"Chofer",id:req.params.id,Usuarios:Usuarios,Autos:Autos, Marcas:Marcas , error:"Ya existe un vehiculo cargado."}); 
            }
            else{
                db.Autos.create({
                    user_id: req.params.id,
                    brand_id: req.body.Marca,
                    patent: req.body.Patente,
                    work_from_hour: req.body.Desde,
                    work_to_hour: req.body.Hasta,
                    });
                return res.render("VistaCrearAuto",{tipo:"Chofer",id:req.params.id,Usuarios:Usuarios, Marcas:Marcas , error:"Vechiculo creado con exito."}); 
            }
        });

    },
    
};      

module.exports = ControlChofer;