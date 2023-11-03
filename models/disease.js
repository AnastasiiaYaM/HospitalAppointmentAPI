module.exports = (sequelize, DataTypes) => {

    const Disease = sequelize.define('diseases', {
        disease_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        disease_title: DataTypes.STRING,
        specialty_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        }},
        {
            freezeTableName: true
        });
        
        return Disease;
    }