const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-course', 'root', 'Nimda123+', {
  host: 'localhost',
  dialect:'mysql'
});

module.exports = sequelize;
