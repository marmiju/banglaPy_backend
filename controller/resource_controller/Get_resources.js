const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const GetResources = async (req, res) => {
    const resouces = await prisma.learningResource.findMany({
        include: { quizs: true },
        orderBy: { id: 'asc' }
    })
    res.status(200).json(resouces)
}

module.exports ={GetResources}