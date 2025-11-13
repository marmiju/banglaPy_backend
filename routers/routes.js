const express = require('express')
const { getProblems, createProblem, getProblem, deletProblem, UpdateProblem } = require('../controller/problemsController/ProblemController')
const { isLogedIn } = require('../middleware/IsLogedIn')
const { RunCode } = require('../controller/RunCode')
const { submitSolution } = require('../controller/submission_controller/Submission')

const router = express.Router()

// code run and submition routes
router.post('/runcode',RunCode )
router.post('/submitcode',isLogedIn,submitSolution )

router.post('/Problem',isLogedIn,createProblem ) //create new problem
router.get('/problems',isLogedIn, getProblems )         // get  problems
router.get('/problem/:id',isLogedIn, getProblem )       // get  problem
router.delete('/problem/:id',isLogedIn, deletProblem )  //delete problem
router.patch('/problem/:id',isLogedIn, UpdateProblem )  //update problem


module.exports= {
    router
}


