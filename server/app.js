const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const routes = require('./routes/routes')
const sequelize = require('./util/db')

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:27017/tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log('mongodb connected')
    }
})
sequelize.sync().then(res => {
    console.log('sql Connected')
}).catch(err => {
    console.log("sql not connected")
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(routes)

app.listen(5000, () => {
    console.log('listening')
})