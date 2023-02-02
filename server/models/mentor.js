const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    students: {
        type: Array,
    },
    questionId: {
        type: Array
    }
})

module.exports = mongoose.model('Mentor', mentorSchema)