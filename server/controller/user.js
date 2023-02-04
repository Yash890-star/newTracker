const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Problem = require('../models/problem')
const fetch = require('node-fetch')
const Dates = require('../models/date')
const Test = require('../models/test')
const { findOneAndUpdate } = require('../models/user')

exports.postRegister = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const exist = await User.findOne({ email: req.body.email })
    if (exist) {
        return res.send('user Exists')
    }
    const user = new User({
        name: req.body.name,
        regNo: req.body.regNo,
        email: req.body.email,
        password: hashedPassword,
        mentor: req.body.mentor,
    })
    try {
        const save = await user.save()
        const result = save.toJSON()
        const { password, ...data } = result
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
}

exports.postLogin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.send('user does not exist')
    }
    if (! await bcrypt.compare(req.body.password, user.password)) {
        return res.send('user credentials do not match')
    }
    try {
        const token = jwt.sign({ _id: user._id }, "key")
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

exports.getProblems = async (req, res, next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    if (!claims) {
        return res.send('pls login')
    }
    const user = await User.findOne({ _id: claims._id })
    const problems = await Problem.find({ mentor: user.mentor })
    return res.send(problems)
}

exports.postAnswers = async (req, res, next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    if (!claims) {
        return res.send('pls login to continue')
    }
    const answer = {
        problem: req.body.problem,
        solutionLink: req.body.solutionLink,
        timeStamp: req.body.timeStamp
    }
    const user = await User.findOne({ _id: claims._id })
    if (!user) {
        return res.send('user does not exist')
    }
    try {
        let flag = 0
        let arrayData = user.date
        user.answers.push(answer)
        for(let x=0;x<arrayData.length;x++){
            if(arrayData[x][0] == req.body.timeStamp){
                arrayData[x][1] += 1
                flag = 1
                await User.findOneAndUpdate({_id: user._id}, {date: arrayData})
            }
        }
        if(flag == 0){
            arrayData.push([req.body.timeStamp, 1])
        }
        const verify = await user.save()
        let dateWiseCount
        let index
        console.log(verify.date.length)
        for(let x=0;x<verify.date.length;x++){
            console.log(req.body.timeStamp)
            if(req.body.timeStamp == verify.date[x][0]){
               dateWiseCount = verify.date[x][1] 
               index = x
            }
        }
        const date = await Dates.findOne({date: req.body.timeStamp, mentor: verify.mentor})
        if(!date){
            const newDate = new Dates({
                date: req.body.timeStamp,
                mentor: user.mentor,
                count:[[dateWiseCount, 1]]
            })
            await newDate.save()
        }
        else{
            let dateArray = date.count
            let flag = 0
            for(let x=0;x<dateArray.length;x++){
                if(date.count[x][0] == verify.date[index][1]){
                    dateArray[x][1] += 1
                    flag = 1
                }
            }
            if(flag == 0){
                dateArray.push([dateWiseCount,1])
            }
            const newDate = await Dates.findOneAndUpdate({date: req.body.timeStamp, mentor: verify.mentor}, {count: dateArray})
            await newDate.save()
        }
        res.send(verify)
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }
}

exports.getLeetCode = async (req, res, next) => {
    const data = await fetch("https://leetcode-stats-api.herokuapp.com/Yash890")
    const result = await data.json()
    res.send(result)
}

exports.getTest = async (req,res,next) => {
    const test = new Test({
        name:{
            "hel": "oo"
        }
    })
    const result = await test.save()
    return result.save()
}