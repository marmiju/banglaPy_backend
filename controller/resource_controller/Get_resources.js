const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient()

const Get_resources = async (req, res) => {
    try {
        const resources = await Prisma.learningResource.findMany({
            include: { quizs: true },
            orderBy: { id: 'asc' }
        });

        // console.log('Fetched resources successfully:', resources);
        res.status(200).json(resources);

    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ msg: 'Internal server error', error });
    }
}

module.exports = { Get_resources };