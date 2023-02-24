const mongoose = require('mongoose')

const Link = mongoose.Schema({
    link: String
})

module.exports = mongoose.model("Link", Link)