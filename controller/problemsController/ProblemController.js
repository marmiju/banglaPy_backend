const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


const createProblem = async (req, res) => {
    try {
        const { title, description, input, output, explanation } = req.body
        console.log(req.body)
        if (!title || !description || !input || !output || !explanation) return res.status(400).json({ success: false, msg: 'required all field!' })
        const newProblem = await prisma.problem.create({
            data: {
                title: title, description: description, sampleInput: input, sampleOutput: output, sampleExplanation: explanation
            }
        })
        return res.status(201).json({ success: true, newProblem })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false })

    }
}
const getProblems = async (req, res) => {
    try {
        const problems = await prisma.problem.findMany({
            include: { submissions: true }
        })
        return res.status(200).json({ success: true, problems: problems })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, msg: 'internal server error' })
    }
}

const getProblem = async (req, res) => {
    const { id } = req.params

    const problem = await prisma.problem.findUnique({
        where: { id: id },
        include: { submissions: true, _count: true, submissions:{include: {user:true}} }
    })
    return res.status(200).json({ success: true, problem })

}

const deletProblem = async (req, res) => {
    try {
        const { id } = req.params
        const response = await prisma.problem.delete({
            where: { id: id }
        })
        return res.status(200).json({ success: true, msg: 'deleted successfull', deleted_problem: response })
    } catch (err) {
        console.log(err)
        return res.status(204).json({ success: true, msg: 'internal server error' })
    }
}

const UpdateProblem = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body
    try {
        const _updated = await prisma.problem.update({
            data,
            where: { id }
        })
        return res.status(200).json({ success: true, msg: 'updated', _updated })
    } catch (err) {
        console.log(err)
        return res.status(204).json({ success: false })
    }
}

module.exports = { getProblems, createProblem, getProblem, deletProblem, UpdateProblem }

