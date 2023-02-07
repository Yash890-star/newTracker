const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Problem = require('../models/problem')
const fetch = require('node-fetch')
const Dates = require('../models/date')
const Test = require('../models/test')
const Submission = require('../models/submission')
const Detail = require('../models/details')

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
        res.send({ message: 'yes' })
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
    const token = jwt.sign({ _id: user._id }, "key")
    console.log(req.body.loggedIn)
    if (req.body.loggedIn == true) {
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 * 100
        })
    }
    else {
        res.cookie('jwt', token, {
            httpOnly: true
        })
    }
    res.send({ message: 'yes' })
}

exports.getUserData = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'key')
        if (!claims) {
            res.send({ message: "user not logged in" })
        }
        const user = await User.findOne({ _id: claims._id })
        res.send(user)
    }
    catch (err) {
        res.send(err)
    }
}

exports.getProblems = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'key')
        if (!claims) {
            return res.send('pls login')
        }
        const user = await User.findOne({ _id: claims._id })
        const problems = await Problem.find({ mentor: user.mentor })
        console.log(problems)
        return res.send(problems)
    }
    catch (err) {
        console.log(err)
    }
}

exports.postAnswers = async (req, res, next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    if (!claims) {
        return res.send('pls login to continue')
    }
    const answer = {
        problem: req.body.problemLink,
        solutionLink: req.body.solutionLink,
        submittedDate: req.body.submittedDate,
        createdDate: req.body.createdDate
    }
    const user = await User.findOne({ _id: claims._id })
    if (!user) {
        return res.send('user does not exist')
    }
    try {
        let flag = 0
        let arrayData = user.date
        user.answers.push(answer)
        for (let x = 0; x < arrayData.length; x++) {
            if (arrayData[x][0] == req.body.submittedDate) {
                arrayData[x][1] += 1
                flag = 1
                await User.findOneAndUpdate({ _id: user._id }, { date: arrayData })
            }
        }
        if (flag == 0) {
            arrayData.push([req.body.submittedDate, 1])
        }
        const verify = await user.save()
        let dateWiseCount
        let index
        console.log(verify.date.length)
        for (let x = 0; x < verify.date.length; x++) {
            console.log(req.body.submittedDate)
            if (req.body.submittedDate == verify.date[x][0]) {
                dateWiseCount = verify.date[x][1]
                index = x
            }
        }
        const date = await Dates.findOne({ date: req.body.submittedDate, mentor: verify.mentor })
        if (!date) {
            const newDate = new Dates({
                date: req.body.submittedDate,
                mentor: user.mentor,
                count: [[dateWiseCount, 1]]
            })
            await newDate.save()
        }
        else {
            let dateArray = date.count
            let flag = 0
            for (let x = 0; x < dateArray.length; x++) {
                if (date.count[x][0] == verify.date[index][1]) {
                    dateArray[x][1] += 1
                    flag = 1
                }
            }
            if (flag == 0) {
                dateArray.push([dateWiseCount, 1])
            }
            const newDate = await Dates.findOneAndUpdate({ date: req.body.submittedDate, mentor: verify.mentor }, { count: dateArray })
            await newDate.save()
        }
        const submission = new Submission({
            mentor: verify.mentor,
            user: verify.email,
            problemLink: req.body.problemLink,
            submissionLink: req.body.solutionLink,
            submittedDate: req.body.submittedDate,
            createdDate: req.body.createdDate
        })
        await submission.save()
        res.send(verify)
    }
    catch (err) {
        console.log(err)
        return res.send(err)
    }
}

exports.getLeetCode = async (req, res, next) => {
    try{
        const data = await fetch("https://leetcode-stats-api.herokuapp.com/Yash890")
        const result = await data.json()
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.send({message: "noFetch"})
    }
}

exports.getTest = async (req, res, next) => {
    const test = new Test({
        name: {
            "hel": "oo"
        }
    })
    const result = await test.save()
    return result.save()
}

exports.getSubmissions = async (req, res, next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    if (!claims) {
        return res.send({ message: "unAuth" })
    }
    const user = await User.findOne({ _id: claims._id })
    const problems = await Submission.find({ user: user.email })
    res.send(problems)
}

exports.postDetails = async (req, res, next) => {
    console.log(req.body)
    const detail = new Detail({
        user: req.body.user,
        dob: req.body.dob,
        year: req.body.year,
        dept: req.body.dept,
        tenthSchool: req.body.tenthSchool,
        tenthBoard: req.body.tenthBoard,
        tweSchool: req.body.tweSchool,
        tweBoard: req.body.tweBoard,
        cutoff: req.body.cutoff,
        address: req.body.address,
        leetCode: req.body.leetcode,
        github: req.body.github,
        linkedIn: req.body.linkedIn
    })
    const result = await detail.save()
    res.send(result)
}

exports.getDetails = async (req,res,next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, "key")
    if(!claims){
        return res.send({message: "pls login"})
    }
    // console.log(claims._id)
    const user = await User.findOne({_id: claims._id})
    // console.log(user)
    const details = await Detail.findOne({user: user.email})
    res.send(details)
}

exports.problemsStatus = async (req,res,next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    const user = await User.findOne({_id: claims._id})
    // console.log(user.answers.length)
    const problems = await Problem.find({mentor: user.mentor})
    // console.log(problems.length)
    res.send({solved: user.answers.length, assigned: problems.length})
}