const Mentor = require('../models/mentor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.postRegister = async (req,res,next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const exist = await Mentor.findOne({email: req.body.email})
    if (exist){
        return res.send('Mentor Exists')
    }
    const mentor = new Mentor({
        name: req.body.name,
        regNo: req.body.regNo,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        const save = await mentor.save()
        const result = save.toJSON()
        const {password, ...data} = result
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}

exports.postLogin = async (req,res,next) => {
    const mentor = await Mentor.findOne({email: req.body.email})
    if(!mentor){
        return res.send('mentor does not exist')
    }
    if(! await bcrypt.compare(req.body.password,mentor.password)){
        return res.send('mentor credentials do not match')
    }
    try{
        const token = jwt.sign({_id: mentor._id}, "key")
        res.cookie('jwt', token, {
            httpOnly: true,
            maxage: 24 * 60 * 60 * 1000
        })
        res.send('success')
    }
    catch (err) {
        res.send('something went wrong')
    }
}

exports.getStudent = async (req,res,next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    if(!claims){
        return res.send('pls login in')
    }
    const student = await User.findOne({regNo: req.body.regNo})
    if(!student){
        res.send('student does not exist')
    }
    return res.send(student)
}