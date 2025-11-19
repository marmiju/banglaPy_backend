const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const getResources = async (req, res) => {

    try {
        const resources = await prisma.learningResource.findMany({
            include: { quizs: true },
            orderBy: { id: 'asc' }
        })
        res.status(200).json(resources)
    } catch (err) {
        console.log('err:', err)
        res.status(500).send('internal server error')
    }
}

module.exports ={
    getResources
}