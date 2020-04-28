module.exports = function(sequelize, DataTypes) {

    let alias = "Autos"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id:{
            type: DataTypes.INTEGER
        },
        brand_id:{
            type: DataTypes.INTEGER
        },
        patent:{
            type: DataTypes.STRING
        },
        work_from_hour:{
            type: DataTypes.TIME
        },
        work_to_hour:{
            type: DataTypes.TIME
        },
        
    }

    let config ={
        tableName:"cars",
        timestamps: false
    }


    let Autos = sequelize.define(alias,cols,config);

    Autos.associate = function(models){


        Autos.belongsTo(models.Usuarios,{
            as: "Usuario",
            foreignKey: "user_id"     
        });

        Autos.belongsTo(models.Marcas,{
            as: "Marca",
            foreignKey: "brand_id"     
        });
    }

    return Autos;
}