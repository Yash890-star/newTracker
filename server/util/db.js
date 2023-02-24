const Sequelize = require('sequelize')

const sequelize = new Sequelize('trail', 'root', 'Trojan890.', {dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize