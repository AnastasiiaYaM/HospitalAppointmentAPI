module.exports = (sequelize, DataTypes) => {

    const Patient = sequelize.define('patients', {
        patient_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
        disease_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
        info: DataTypes.STRING   
        },
        {
            freezeTableName: true
        });
        
        return Patient;
    }