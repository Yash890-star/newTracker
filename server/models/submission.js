const mongoose = require('mongoose')

const Submission = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    mentor: {
        type: String,
        required: true
    },
    problemLink: {
        type: String,
        required: true
    },
    submissionLink: {
        type: String,
        required: true
    },
    submittedDate: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Submission', Submission)