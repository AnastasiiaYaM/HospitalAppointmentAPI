module.exports = (sequelize, DataTypes) => {

    const Specialty = sequelize.define('specialties', {
        specialty_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        specialty_title: DataTypes.STRING,
        disease_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        }},
        {
            freezeTableName: true
        });
        
        return Specialty;
    }