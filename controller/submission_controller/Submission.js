const { PrismaClient } = require('@prisma/client')
const { runPythonCode } = require('../../services/pistonRunner')
const { convertedpython } = require('../../services/convertedPython')
const { HandleErr } = require('../RunCode')
const { activity } = require('../activityController/Activity')

const prisma = new PrismaClient()

const submitSolution = async (req, res) => {
    try {
        const { problemId, userId, code, input } = req.body
        if (!userId || !code || !problemId) {
            return res.status(400).json({ success: false, msg: 'every field required!' })
        }

        const converted = await convertedpython(code)
        const { stdout, stderr } = await runPythonCode(converted, input);
        const output = stdout;
        console.log("Submission output:", output);

        // activity
        const act = await activity(userId)
    
        const problem = await prisma.problem.findUnique({
            where: {
                id: problemId,
            }
        })

        if (!problem) return res.status(404).json({ success: false, msg: 'problem not found' })
        const isCorrect = output.trim() === problem.sampleOutput.trim()
        const score = isCorrect ? 10 : 0

        const submission = await prisma.submission.create({
            data: {
                userId: userId,
                problemId: problemId,
                code: code,
                isCorrect: isCorrect,
                score: score
            }
        })

        // update or create user score 
        const existingUser = await prisma.userScore.findUnique({
            where: {
                userId: userId
            }
        })

        const isCorrectSubmission = await prisma.submission.findMany({
            where: {
                userId: userId,
                problemId: problemId,
                isCorrect: true
            }
        })

        if (isCorrectSubmission.length > 1) return res.json({
            success: true,
            pythonCode: converted,
            isCorrect,
            msg: 'আপনি সঠিক সমাধান দিয়েছেন!',
            submission,
            output: stdout,
            stderr: HandleErr(stderr.includes("main.py") ? stderr.slice(stderr.indexOf("main.py") + 10) : ""),
        });


        if (existingUser) {
            await prisma.userScore.update({
                where: { userId: userId },
                data: {
                    totalScore: { increment: score },
                    solvedCount: isCorrect ? { increment: 1 } : undefined
                }
            })
        }
        else {
            await prisma.userScore.create({
                data: {
                    userId: userId,
                    totalScore: score,
                    solvedCount: isCorrect ? 1 : 0
                }
            })
        }


        res.json({
            success: true,
            act,
            pythonCode: converted,
            isCorrect,
            msg: isCorrect ? 'আপনি সঠিক সমাধান দিয়েছেন!' : 'ভুল সমাধান। আবার চেষ্টা করুন।',
            submission,
            output: stdout,
            stderr: HandleErr(stderr.includes("main.py") ? stderr.slice(stderr.indexOf("main.py") + 10) : ""),
        });


    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, msg: 'internal server error' })
    }
}


module.exports = {
    submitSolution
}