module.exports = function(sequelize, DataTypes) {

    let alias = "Marcas"

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING
        }
    }

    let config ={
        tableName:"brands",
        timestamps: false
    }


    let Marcas= sequelize.define(alias,cols,config);

    Marcas.associate = function(models){
        Marcas.hasMany(models.Autos,{
            as: "Autos",
            foreignKey: "brand_id"     
        });
    }

    return Marcas;
}