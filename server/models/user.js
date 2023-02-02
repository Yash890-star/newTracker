const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regNo: {
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
    mentor: {
        type: String,
        required: true
    },
    answers: {
        type: Array
    }

})

module.exports = mongoose.model('User', userSchema)