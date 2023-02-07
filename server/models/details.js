const mongoose = require('mongoose')

const Details = mongoose.Schema({
    user: String,
    dob: String,
    year: String,
    dept: String,
    tenthSchool: String,
    tenthBoard: String,
    tweSchool: String,
    tweBoard: String,
    cutoff: String,
    address: String,
    leetCode: String,
    github: String,
    linkedIn: String
})

module.exports = mongoose.model('Detail', Details)