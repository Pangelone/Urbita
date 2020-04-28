
module.exports = function(sequelize, DataTypes) {

    let alias = "Usuarios"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING
        },
        first_name:{
            type: DataTypes.STRING
        },
        last_name:{
            type: DataTypes.STRING
        },
        identification_number:{
            type: DataTypes.INTEGER
        },
        avatar:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },

    }

    let config ={
        tableName:"users",
        timestamps: false
    }


    let Usuarios= sequelize.define(alias,cols,config);

    Usuarios.associate = function(models){
        Usuarios.hasMany(models.ViajesSolicitados,{
            as: "ViajesSolicitados",
            foreignKey: "user_id"     
        });

        Usuarios.hasMany(models.Autos,{
            as: "Autos",
            foreignKey: "user_id"     
        });

    }


    return Usuarios;
}