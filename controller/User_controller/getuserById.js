const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const GetUserById = async(req,res)=>{
    const {userId} = req.params;
    const user =await  prisma.user.findUnique({
        where:{
            id: userId
        }
    })
    return res.status(200).json(user)
}

module.exports ={GetUserById}