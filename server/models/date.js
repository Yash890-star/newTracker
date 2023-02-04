const mongoose = require('mongoose')

const DateSchema = mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    mentor: {
        type: String,
        required: true
    },
    count: {
        type: Object
    }
})

module.exports = mongoose.model('Date', DateSchema)