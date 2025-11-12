const express = require('express')
const { getProblems, createProblem, getProblem, deletProblem, UpdateProblem } = require('../controller/problemsController/ProblemController')
const { isLogedIn } = require('../middleware/IsLogedIn')

const router = express.Router()

router.post('/Problem',createProblem ) //create new problem
router.get('/problems',isLogedIn, getProblems )         // get  problems
router.get('/problem/:id',isLogedIn, getProblem )       // get  problem
router.delete('/problem/:id',deletProblem )  //delete problem
router.patch('/problem/:id',UpdateProblem )  //update problem


module.exports= {
    router
}


