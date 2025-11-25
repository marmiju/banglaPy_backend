const express = require('express')
const { getProblems, createProblem, getProblem, deletProblem, UpdateProblem } = require('../controller/problemsController/ProblemController')
const { isLogedIn } = require('../middleware/IsLogedIn')
const { RunCode } = require('../controller/RunCode')
const { submitSolution } = require('../controller/submission_controller/Submission')
const { ranking } = require('../controller/ranking/Ranking')
const {  Create_Quiz } = require('../controller/resource_controller/Quiz')
const { LearnComplete } = require('../controller/resource_controller/learn_Cmplete')
const { getbadge } = require('../controller/resource_controller/GetBadge')
const { getResources } = require('../controller/resource_controller/get_resources')
const { getActivities } = require('../controller/activityController/GetActivity')
const { GetUserById } = require('../controller/User_controller/getuserById')
const { UserScore } = require('../controller/User_controller/UserScore')
const GetSubmission = require('../controller/submission_controller/GetSubmission')
const { GetLearned } = require('../controller/submission_controller/GetLeanred')

const router = express.Router()

// code run and submition routes
router.post('/runcode',RunCode )
router.post('/submitcode',isLogedIn,submitSolution )

router.post('/Problem',isLogedIn,createProblem ) //create new problem
router.get('/problems',isLogedIn, getProblems )         // get  problems
router.get('/problem/:id', getProblem )       // get  problem
router.delete('/problem/:id',isLogedIn, deletProblem )  //delete problem
router.patch('/problem/:id',isLogedIn, UpdateProblem )  //update problem

router.get('/ranking', ranking  )  //ranking User

// resource routes can be added here
router.get('/resoureces', getResources)
router.post('/addQuiz', Create_Quiz)
router.post('/learing',isLogedIn, LearnComplete) // complete learning

router.get('/badge/:userId',getbadge)
router.get('/activities/:userId',getActivities)

// get User by id
router.get('/user/:userId',GetUserById)
router.get('/user_score/:userId',UserScore)
router.get('/submission/:userId',GetSubmission)
router.get('/learned/:userId',GetLearned)

module.exports= {
    router
}


