const router = require('express').Router()

//Controller Imports
const userRoutes = require('../controller/user')
const mentorRoutes = require('../controller/mentor')
const problemRoutes = require('../controller/problem')

//User Routes
router.post('/register', userRoutes.postRegister)
router.post('/login', userRoutes.postLogin)
router.get('/getProblems', userRoutes.getProblems)
router.post('/postAnswers', userRoutes.postAnswers)
router.get('/leetcode', userRoutes.getLeetCode)
router.get('/getTest', userRoutes.getTest)

//Mentor Routes
router.post('/mentorRegister', mentorRoutes.postRegister)
router.post('/mentorLogin', mentorRoutes.postLogin)
router.post('/getStudent', mentorRoutes.getStudent)

//Problem Routes
router.post('/addProblem', problemRoutes.postAddProblem)

module.exports = router