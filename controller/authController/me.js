const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const GETME = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    })
    console.log(user)
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send('internal server error')
  }

}

module.exports = { GETME }
