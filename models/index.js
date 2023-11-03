const dbConfig = require('../util/database');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USERNAME, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

db.users = require('./user')(sequelize, Sequelize);
db.doctors = require('./doctor')(sequelize, Sequelize);
db.patients = require('./patient')(sequelize, Sequelize);
db.admins = require('./admin')(sequelize, Sequelize);
db.specialties = require('./specialty')(sequelize, Sequelize);
db.diseases = require('./disease')(sequelize, Sequelize);
db.appointments = require('./appointment')(sequelize, Sequelize);
db.reviews = require('./review')(sequelize, Sequelize);
db.conflicts = require('./conflict')(sequelize, Sequelize);
db.auth = require('./auth')(sequelize, Sequelize);

module.exports = db;