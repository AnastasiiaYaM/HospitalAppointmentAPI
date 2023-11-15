module.exports = (sequelize, DataTypes) => {

    const Auth = sequelize.define('auth', {
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            freezeTableName: true
        });
        
        return Auth;
    }