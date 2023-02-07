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
router.get('/getUserData', userRoutes.getUserData)
router.get('/getSubmissions', userRoutes.getSubmissions)
router.post('/postDetails', userRoutes.postDetails)
router.get('/getDetails', userRoutes.getDetails)
router.get('/problemsStatus', userRoutes.problemsStatus)

//Mentor Routes
router.post('/mentorRegister', mentorRoutes.postRegister)
router.post('/mentorLogin', mentorRoutes.postLogin)
router.post('/getStudent', mentorRoutes.getStudent)
router.get('/getMentor', mentorRoutes.getMentor)
router.post('/getTodaySubmission', mentorRoutes.getTodaySubmission)
router.post('/getStudentSubmission', mentorRoutes.getStudentSubmission)
router.post('/logout', mentorRoutes.postLogout)

//Problem Routes
router.post('/addProblem', problemRoutes.postAddProblem)

module.exports = router