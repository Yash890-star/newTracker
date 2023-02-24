const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const graphData = sequelize.define('graphData', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number1: {
        type: Sequelize.INTEGER,
    }
},{
    timestamps: false
})

module.exports = graphData;