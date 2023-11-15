const env = require('dotenv').config();
require('iconv-lite').encodingExists('foo');

const db = {
  HOST: process.env.DB_HOST,
  USERNAME: process.env.DB_USER,
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  define: {
    underscored: false,
    freezeTableName: false,
    syncOnAssociation: true,
    charset: 'utf8',
    timestamps: true,
  },
  dialectOptions: {
    collate: 'utf8_general_ci'
  },
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
}

module.exports = db;