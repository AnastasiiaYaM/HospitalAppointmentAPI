const Sequelize = require('sequelize');

const sequelize = new Sequelize('hospitalappointmentapi', 'root', '2023$$SOLVD', {
  dialect: 'mysql',
  host: 'localhost'
});



module.exports = sequelize;
