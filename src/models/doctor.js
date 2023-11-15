module.exports = (sequelize, DataTypes) => {

    const Doctor = sequelize.define('doctors', {
        doctor_id: {
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
        specialty_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
        working_hours: DataTypes.STRING,
        availability: DataTypes.TINYINT
   
        },
        {
            freezeTableName: true
        });
        
        return Doctor;
    }