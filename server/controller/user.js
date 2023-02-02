const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Problem = require('../models/problem')

exports.postRegister = async (req,res,next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const exist = await User.findOne({email: req.body.email})
    if (exist){
        return res.send('user Exists')
    }
    const user = new User({
        name: req.body.name,
        regNo: req.body.regNo,
        email: req.body.email,
        password: hashedPassword,
        mentor: req.body.mentor
    })
    try{
        const save = await user.save()
        const result = save.toJSON()
        const {password, ...data} = result
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}

exports.postLogin = async (req,res,next) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.send('user does not exist')
    }
    if(! await bcrypt.compare(req.body.password, user.password)){
        return res.send('user credentials do not match')
    }
    try{
        const token = jwt.sign({_id: user._id}, "key")
        res.cookie('jwt', token, {
            httpOnly: true,
            maxage: 24 * 60 * 60 * 1000
        })
        res.send('success')
    }
    catch (err) {
        res.send(err)
    }
}

exports.getProblems = async (req,res,next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    if(!claims){
        return res.send('pls login')
    }
    const user = await User.findOne({_id: claims._id})
    const problems = await Problem.find({mentor: user.mentor})
    return res.send(problems)
}

exports.postAnswers = async (req,res,next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    console.log('hi')
    if(!claims){
        return res.send('pls login to continue')
    }
    const answer = {
        problem: req.body.problem,
        solutionLink: req.body.solutionLink,
        timeStamp: req.body.timeStamp
    }
    const user = await User.findOne({_id: claims._id})
    if(!user){
        return res.send('user does not exist')
    }
    try{
        user.answers.push(answer)
        const verify = await user.save()
        res.send(verify)
    }
    catch{
        return res.send('err')
    }
}