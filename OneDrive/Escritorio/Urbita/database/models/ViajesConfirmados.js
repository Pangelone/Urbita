module.exports = function(sequelize, DataTypes) {

    let alias = "ViajesConfirmados"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trip_id:{
            type: DataTypes.INTEGER
        },
        car_id:{
            type: DataTypes.INTEGER
        }
        
    }

    let config ={
        tableName:"trip",
        timestamps: false
    }


    let ViajesConfirmados= sequelize.define(alias,cols,config);

    ViajesConfirmados.associate = function(models){
        ViajesConfirmados.hasMany(models.Comentarios,{
            as: "Comentarios",
            foreignKey: "trip_id"     
        });

        ViajesConfirmados.belongsTo(models.ViajesSolicitados,{
            as: "ViajeSolicitado",
            foreignKey: "trip_id"     
        });

        ViajesConfirmados.belongsTo(models.Autos,{
            as: "Auto",
            foreignKey: "car_id"     
        });
    }



    return ViajesConfirmados;
}