const { PrismaClient } = require("@prisma/client");
const prism = new PrismaClient()

const UserScore = async (req, res) => {
    const { userId } = req.params
    try {
        const score = await prism.userScore.findUnique({
            where: {
                userId
            }
        })
        return res.status(200).json(score)
    }catch(err){
        console.log(err)
        res.status(500).send('internal server error!')
    }
   
}

module.exports = { UserScore }