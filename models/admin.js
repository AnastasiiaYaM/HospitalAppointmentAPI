module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define('admins', {
        admin_id: {
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
        is_active: DataTypes.TINYINT   
        },
        {
            freezeTableName: true
        });
        
        return Admin;
    }