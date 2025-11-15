const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const ranking = async (req, res) => {

    try {

        const rank = await prisma.userScore.findMany({
            orderBy: { totalScore: 'desc' },
            include: { user: true  }
        })

        res.status(200).json({ success: true, msg:'fetch ranking',  rank })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, msg: 'internal server error' })
    }

}
module.exports = { ranking }