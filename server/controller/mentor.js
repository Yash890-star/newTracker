const Mentor = require('../models/mentor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Submission = require('../models/submission')

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
        return res.send('mentor does not exist')
    }
    if (! await bcrypt.compare(req.body.password, mentor.password)) {
        return res.send('mentor credentials do not match')
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
    return res.send(student)
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
    const submission = await Submission.find({ mentor: req.body.mentor, date: req.body.date })
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

