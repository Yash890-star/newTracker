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
    },
    createdDate: {
        type: String,
        required: true
    },
    submissionDate: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    name: String
})

module.exports = mongoose.model('Problem', problemSchema)