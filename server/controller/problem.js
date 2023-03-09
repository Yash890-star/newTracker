const Problem = require('../models/problem')
const Mentor = require('../models/mentor')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')
const sgMail = require('@sendgrid/mail')
const { response } = require('express')

exports.postAddProblem = async (req, res, next) => {
    try {
        const cookie = await req.cookies['jwt']
        const valid = jwt.verify(cookie, 'key')
        if (!valid) {
            return res.send('pls login')
        }
        const mentor = await Mentor.findOne({ _id: valid._id })
        const problem = new Problem({
            mentor: mentor.email,
            link: req.body.link,
            level: req.body.level,
            createdDate: req.body.createdDate,
            submissionDate: req.body.submissionDate,
            topic: req.body.topic,
            name: req.body.name
        })
        const result = await problem.save()

        const nodemailer = require('nodemailer')
        let config = {
            service: 'gmail',
            auth: {
                user: "yashwanthk523@gmail.com",
                pass: "liookxwpkwbmjnyv"
            }
        }
        let transporter = nodemailer.createTransport(config)
        let message = {
            from: "yashwanthk523@gmail.com",
            to: "yeswanthkumar.cse2020@citchennai.net",
            subject: "test",
            html: `<div>
            <h1>Hello Your Mentor has assigned a problem </h1>
            <a></a>
            </div>`
        }
        transporter.sendMail(message).then(() => {
            console.log("done")
        }).catch((err) => {
            console.log(err)
        })
        res.send(result)
    }
    catch (err) {
        console.log(err)
        res.send('The problem was not added')
    }
}