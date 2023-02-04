const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    name: Object
})

module.exports = mongoose.model('Test', testSchema)