const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient()




const Create_Quiz = async (req, res) => {
    const data = req.body;

    try {
        const newResource = await Prisma.quiz.create({
            data
        });
        return res.status(200).json({newResource})

    } catch (error) {
        console.error('Error creating resource:', error);
        res.status(500).json({ error: 'Internal server error' });
    }



}

module.exports = { Create_Quiz };