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
    const problem = new Problem({
        mentor: req.body.mentor,
        link: req.body.link,
        level: req.body.level
    })
        const result = await problem.save()
        res.send(result)
    }
    catch{
        res.send('The problem was not added')
    }
}