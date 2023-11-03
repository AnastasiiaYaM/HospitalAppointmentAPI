module.exports = (sequelize, DataTypes) => {

    const Appointment = sequelize.define('appointments', {
        appointment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        patient_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
            appointment_status: DataTypes.ENUM('creating', 'approved', 'cancelled'),
            date: DataTypes.STRING,
            start: DataTypes.STRING,
            end: DataTypes.STRING
        },
        {
            freezeTableName: true
        });
        
        return Appointment;
    }