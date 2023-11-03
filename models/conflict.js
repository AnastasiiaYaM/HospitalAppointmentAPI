module.exports = (sequelize, DataTypes) => {

    const Conflict = sequelize.define('conflicts', {
        conflict_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        admin_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
        appointment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
        reason: DataTypes.STRING,
        conflict_status: DataTypes.ENUM('processing', 'fulfilled', 'rejected')             
        },
        {
            freezeTableName: true
        });
        
        return Conflict;
    }