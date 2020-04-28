module.exports = function(sequelize, DataTypes) {

    let alias = "Comentarios"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trip_id:{
            type: DataTypes.INTEGER
        },
        rating:{
            type: DataTypes.INTEGER
        },
        content:{
            type: DataTypes.STRING
        },

    }

    let config ={
        tableName:"comments",
        timestamps: false
    }


    let Comentarios= sequelize.define(alias,cols,config);

    Comentarios.associate = function(models){
        Comentarios.belongsTo(models.ViajesConfirmados,{
            as: "ViajeConfirmado",
            foreignKey: "trip_id"     
           });
    }

    return Comentarios;
}