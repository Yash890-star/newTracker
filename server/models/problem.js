const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    mentor: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Problem', problemSchema)