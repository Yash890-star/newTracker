const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const routes = require('./routes/routes')

mongoose.connect('mongodb://localhost:27017/tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log('connected')
    }
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(routes)

app.listen(5000, () => {
    console.log('listening')
})