const { Sequelize } = require('sequelize');
const { 
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASS } = require('../config');

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  dialect: 'mysql', // Or any other dialect
});

module.exports = sequelize;