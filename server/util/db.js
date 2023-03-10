const Sequelize = require('sequelize')

const sequelize = new Sequelize('myDB', 'user', 'user_password', {dialect: 'mysql',
    host: 'host.docker.internal',
    port: 3306
})

module.exports = sequelize