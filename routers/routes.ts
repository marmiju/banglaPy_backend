import express from "express";
import {
  getProblems,
  createProblem,
  getProblem,
  deletProblem,
  UpdateProblem,
} from "../controller/problemsController/ProblemController";
import { isLogedIn } from "../middleware/IsLogedIn";
import { RunCode } from "../controller/RunCode";
import { submitSolution } from "../controller/submission_controller/Submission";
import { ranking } from "../controller/ranking/Ranking";
import { Create_Quiz } from "../controller/resource_controller/Quiz";
import { LearnComplete } from "../controller/resource_controller/learn_Cmplete";
import { getbadge } from "../controller/resource_controller/GetBadge";
import { getResources } from "../controller/resource_controller/get_resources";
import { getActivities } from "../controller/activityController/GetActivity";
import { GetUserById } from "../controller/User_controller/getuserById";
import { UserScore } from "../controller/User_controller/UserScore";
import GetSubmission from "../controller/submission_controller/GetSubmission";
import { GetLearned } from "../controller/submission_controller/GetLeanred";

export const router = express.Router();

// code run and submition routes
router.post("/runcode", RunCode);
router.post("/submitcode", isLogedIn, submitSolution);

router.post("/Problem", isLogedIn, createProblem); //create new problem
router.get("/problems", isLogedIn, getProblems); // get  problems
router.get("/problem/:id", getProblem); // get  problem
router.delete("/problem/:id", isLogedIn, deletProblem); //delete problem
router.patch("/problem/:id", isLogedIn, UpdateProblem); //update problem

router.get("/ranking", ranking); //ranking User

// resource routes can be added here
router.get("/resoureces", getResources);
router.post("/addQuiz", Create_Quiz);
router.post("/learing", isLogedIn, LearnComplete); // complete learning

router.get("/badge/:userId", getbadge);
router.get("/activities/:userId", getActivities);

// get User by id
router.get("/user/:userId", GetUserById);
router.get("/user_score/:userId", UserScore);
router.get("/submission/:userId", GetSubmission);
router.get("/learned/:userId", GetLearned);

