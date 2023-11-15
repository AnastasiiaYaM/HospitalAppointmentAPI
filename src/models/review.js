module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define('reviews', {
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        appointment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            foreignKey: true
        },
            review_creator: DataTypes.ENUM('patient', 'doctor', 'admin'),
            rate: DataTypes.INTEGER,
            message: DataTypes.STRING
        },
        {
            freezeTableName: true
        });
        
        return Review;
    }