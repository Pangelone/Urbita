
let db = require ("../database/models");

let moment = require("moment");

const { Op } = require('sequelize')

let ControlPasajero = {













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
            include: [{association: "Usuario"},{association: "Marca"}]
        })

        let Comentarios =  
        db.Comentarios.findAll({
            include: [{association: "ViajeConfirmado"}]
        })

        let ViajesSolicitados =  
        db.ViajesSolicitados.findAll({
            where:{
                
            },
            include: [{association: "ViajesConfirmados"},{association: "Usuario"}]
        })

        let ViajesConfirmados =  
        db.ViajesConfirmados.findAll({
            include: [{association: "ViajeSolicitado"},{association: "Comentarios"},{association: "Auto"}]
        })

        Promise.all([Comentarios,Marcas,Usuarios,ViajesSolicitados,ViajesConfirmados,Autos])

        .then(function([Marcas,Usuarios,ViajesSolicitados,ViajesConfirmados,Autos]){
            return res.render("VistaVerViajes",{Comentarios:Comentarios,id:req.params.id,Marcas:Marcas,ViajesConfirmados:ViajesConfirmados,Autos:Autos,Usuarios:Usuarios,ViajesSolicitados:ViajesSolicitados}); 
        });

    },















    Consultar: function (req, res) {
        db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })
        
        .then(function(Usuarios){
            return res.render("VistaPasajero",{Usuarios:Usuarios}); 
        });

    },

















    Finalizarviaje: function (req, res) {

        let viajes = db.ViajesSolicitados.findAll({
            where:{
                total_price: req.body.precioviaje,
                estimated_time: req.body.tiempoviaje,
            },
            include: [{association: "ViajesConfirmados"},{association: "Usuario"}]
        })

        let Usuarios = db.Usuarios.findAll({
            where:{
                id: req.params.id,
            },
            include: [{association: "ViajesSolicitados"},{association: "Autos"}]
        })
        
        Promise.all([viajes,Usuarios]) 

        .then(function([Viajes,Usuarios]){
            db.ViajesConfirmados.create({
                trip_id: Viajes[0].id,
                car_id: req.body.autoid,
            });
            return res.render("VistaPasajero",{Usuarios:Usuarios, Viajes:Viajes}); 
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
















    SolicitarViaje: function (req, res) {

        let ConsultaUsuario = db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })

        let ConsultaMarca = db.Marcas.findAll()
        
        let ConsultaAuto = db.Autos.findAll({
            
            
            where:{
                
                [Op.and]:[
                    {
                        work_to_hour: {
                        [Op.gte]: moment().format('HH:mm:ss')   
                        }
                    },
                    {
                        work_from_hour: {
                        [Op.lte]: moment().format('HH:mm:ss')   
                        }
                    }
                ]

            }
            
        })

        Promise.all([ConsultaUsuario,ConsultaAuto,ConsultaMarca])

        .then(function([Usuarios, Autos, Marcas, Avatar , Nombre, Patente, error]){
            return res.render("VistaSolicitarViaje",{carid: "",Precio:"", Tiempo:"",Avatar:"",Marcas:Marcas ,Nombre:"",Patente:"", Usuarios:Usuarios , Autos:Autos , error:"", id:req.params.id}); 
        });

    },

















    
    SolicitarViajePost: function (req, res) {

        let ConsultaUsuario = db.Usuarios.findAll({
            where:{
                id: req.params.id,
            }
        })

        let ConsultaMarca = db.Marcas.findAll()
        
        
        let ConsultaAuto = db.Autos.findAll({
            
            where:{
                
                [Op.and]:[
                    {
                        work_to_hour: {
                        [Op.gte]: moment().format('HH:mm:ss')   
                        }
                    },
                    {
                        work_from_hour: {
                        [Op.lte]: moment().format('HH:mm:ss')   
                        }
                    }
                ]

            }
            
        })



        Promise.all([ConsultaUsuario,ConsultaAuto,ConsultaMarca])

        .then(function([Usuarios, Autos, Avatar, Marcas , Nombre, Patente, error]){
            
            let RandomAuto = Math.floor((Math.random() * (Autos.length )) + 0)
        
            let ConsultaAuto = db.Autos.findAll({
            
                where:{
                    
                    [Op.and]:[
                        {
                            work_to_hour: {
                            [Op.gte]: moment().format('HH:mm:ss')   
                            }
                        },
                        {
                            work_from_hour: {
                            [Op.lte]: moment().format('HH:mm:ss')   
                            }
                        }
                    ]
    
                }
                
            })

                let ConsultaMarca = db.Marcas.findAll({
                    where:{
                        id: Autos[RandomAuto].brand_id,
                    }
                })
    
                let ConsultaUsuario = db.Usuarios.findAll({
                    where:{
                        id: Autos[RandomAuto].user_id,
                    }
                })



            Promise.all([ConsultaUsuario,ConsultaAuto,ConsultaMarca])
    
            .then(function([Usuarios, Autos, Avatar, Marcas , Nombre, Patente, error]){

                let RandomPrecio = Math.floor((Math.random() * 5000) + 1)
                let RandomTime = Math.floor((Math.random() * 60) + 1)
    
                if (Autos.length >0) {
    
                    db.ViajesSolicitados.create({
    
                        user_id: req.params.id,
                        from_address: req.body.Desde,
                        to_address: req.body.Hasta,
                        total_price: RandomPrecio,
                        estimated_time: RandomTime,
        
                    });
        
                    return res.render("VistaSolicitarViaje",{Tiempo:RandomTime, Precio:RandomPrecio, Usuarios:Usuarios , Autos:Autos, error: "",Avatar: Usuarios[0].avatar, Nombre:Usuarios[0].first_name + " " + Usuarios[0].last_name,carid: Autos[RandomAuto].id, Patente: Autos[RandomAuto].patent, Marcas:Marcas , id:req.params.id}); 
              
                } else{
    
                    return res.render("VistaSolicitarViaje",{Precio:"", Tiempo:"", Usuarios:Usuarios , Autos:Autos , error:"Lo sentimos, no hay choferes disponibles.", Avatar: "", Nombre:"", Patente:"", Marcas:"" , id:req.params.id, carid: ""}); 
    
                }
    
            });
        

        });
    


    },




};      

module.exports = ControlPasajero;