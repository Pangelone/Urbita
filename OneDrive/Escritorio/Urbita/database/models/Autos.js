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
        created_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
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

        Autos.belongsToMany(models.ViajesSolicitados,{
            as: "ViajesSolicitados",
            through: "trip",
            foreignKey: "car_id",
            otherKey: "trip_id",
            timestamps: false
        });
    }

    return Autos;
}