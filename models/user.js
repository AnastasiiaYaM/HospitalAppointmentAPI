module.exports = (sequelize, DataTypes) => {

const User = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
        role_type: DataTypes.ENUM('patient', 'doctor', 'admin'),
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING
    },
    {
        freezeTableName: true
    });
    
    return User;
}