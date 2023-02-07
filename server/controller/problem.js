const Problem = require('../models/problem')
const Mentor = require('../models/mentor')
const jwt = require('jsonwebtoken')

exports.postAddProblem = async (req,res,next) => {
    try{
    const cookie = await req.cookies['jwt']
    const valid = jwt.verify(cookie, 'key')
    if(!valid){
        return res.send('pls login')
    }
    const mentor = await Mentor.findOne({_id: valid._id})
    const problem = new Problem({
        mentor: mentor.email,
        link: req.body.link,
        level: req.body.level,
        createdDate: req.body.createdDate,
        submissionDate: req.body.submissionDate,
        topic: req.body.topic
    })
        const result = await problem.save()
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.send('The problem was not added')
    }
}