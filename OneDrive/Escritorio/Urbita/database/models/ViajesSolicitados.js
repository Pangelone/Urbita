module.exports = function(sequelize, DataTypes) {

    let alias = "ViajesSolicitados"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id:{
            type: DataTypes.STRING
        },
        from_address:{
            type: DataTypes.STRING
        },
        to_address:{
            type: DataTypes.STRING
        },
        total_price:{
            type: DataTypes.INTEGER
        },
        estimated_time:{
            type: DataTypes.INTEGER
        },

    }

    let config ={
        tableName:"trip_request",
        timestamps: false
    }


    let ViajesSolicitados= sequelize.define(alias,cols,config);

    ViajesSolicitados.associate = function(models){
        ViajesSolicitados.hasMany(models.ViajesConfirmados,{
            as: "ViajesConfirmados",
            foreignKey: "trip_id"     
        });

        ViajesSolicitados.belongsTo(models.Usuarios,{
            as: "Usuario",
            foreignKey: "user_id"     
        });
    }

    return ViajesSolicitados;
}