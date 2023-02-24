const Mentor = require('../models/mentor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Submission = require('../models/submission')
const Detail = require('../models/details')
const Problem = require('../models/problem')
const Date = require("../models/date")
const submission = require('../models/submission')
const dateSql = require('../models/dateSql')
const sequelize = require('../util/db')
const { Op } = require("sequelize");

exports.postRegister = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const exist = await Mentor.findOne({ email: req.body.email })
    if (exist) {
        return res.send('Mentor Exists')
    }
    const mentor = new Mentor({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const save = await mentor.save()
        res.send({ message: "yes" })
    }
    catch (err) {
        res.send(err)
    }
}

exports.postLogin = async (req, res, next) => {
    const mentor = await Mentor.findOne({ email: req.body.email })
    if (!mentor) {
        return res.send({'message':'mentor does not exist'})
    }
    if (! await bcrypt.compare(req.body.password, mentor.password)) {
        return res.send({'message':'mentor credentials do not match'})
    }
    try {
        const token = jwt.sign({ _id: mentor._id }, "key")
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 * 100
        })
        res.send({ message: 'yes' })
    }
    catch (err) {
        res.send('something went wrong')
    }
}

exports.getStudent = async (req, res, next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'key')
    if (!claims) {
        return res.send('pls login in')
    }
    const student = await User.findOne({ regNo: req.body.regNo })
    if (!student) {
        res.send('student does not exist')
    }
    console.log(student.email)
    const details = await Detail.findOne({ user: student.email })
    const problems = await Problem.find({ mentor: student.mentor })
    const submissionData = await Submission.find({ user: student.email })
    return res.send({
        student: student,
        details: details,
        submissionData: submissionData,
        problems: {
            solved: student.answers.length,
            assigned: problems.length
        }
    })
}

exports.getMentor = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'key')
        if (!claims) {
            res.send('pls login')
        }
        else {
            const mentor = await Mentor.findOne({ _id: claims._id })
            res.send({ mentor: mentor.email })
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.getTodaySubmission = async (req, res, next) => {
    console.log(req.body.mentor, req.body.date)
    const submission = await Submission.find({ mentor: req.body.mentor, submittedDate: req.body.date })
    console.log(submission)
    res.send(submission)
}

exports.getStudentSubmission = async (req, res, next) => {
    const submissionData = await Submission.find({ email: req.body.email })
    res.send(submissionData)
}

exports.postLogout = async (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 0 })
    return res.send({
        body: "success"
    })
}

exports.getGraphData = async (req, res, next) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, "key")
    if(!claims){
        return res.send({message:0})
    }
    const mentor = await Mentor.findOne({ _id: claims._id })

    const date = await Date.findOne({ date: req.body.date, mentor: mentor.email })
    if(!date){
        return res.send({message:0})
    }
    const [result, metaData] = await sequelize.query(`select name, number1 from graphData where date = '${req.body.date}'`)
    let names = []
    let numbers = []
    console.log(result)
    for (let x of result){
        names.push(x.name)
        numbers.push(x.number1)
    }
    let response = {
        names: names,
        numbers: numbers
    }
    return res.send(response)
}

exports.getAllAssignments = async (req,res,next) => {
    let a = {}
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, "key")
    if(!claims){
        return res.send({message:0})
    }
    const mentor = await Mentor.findOne({ _id: claims._id })
    const problems = await Problem.find({mentor: mentor.email})
    for (let x of problems){
        if(!a[x.createdDate]){
            a[x.createdDate] = [x]
        }
        else{
            a[x.createdDate].push(x)
        }
    }
    res.send(a)
}

exports.getDateWiseSubmissions = async (req,res,next) => {
    let a = {}
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, "key")
    if(!claims){
        return res.send({message:0})
    }
    const mentor = await Mentor.findOne({ _id: claims._id })
    const submissions = await Submission.find({mentor: mentor.email})
    for (let x of submissions){
        if(!a[x.submittedDate]){
            a[x.submittedDate] = [x]
        }
        else{
            a[x.submittedDate].push(x)
        }
    }
    res.send(a)
}

exports.getAllDates = async (req,res,next) => {
    const cookie = req.cookies['jwt']
    console.log(req.cookies)
    const claims = jwt.verify(cookie, "key")
    if(!claims){
        return res.send({message:0})
    }
    const mentor = await Mentor.findOne({ _id: claims._id })
    const [result, metaData] = await sequelize.query(`select distinct date from graphData`)
    let a = []
    for (let x of result){
        a.push(x.date)
    }
    res.send(a)
}