const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()


const getbadge = async (req, res) => {
    const { userId } = req.params
    const badges = await prisma.badge.findMany({
        where: {
            userId: userId
        },
        orderBy: { level: 'desc'},
    })
    res.status(200).json(badges)
}

module.exports = { getbadge }