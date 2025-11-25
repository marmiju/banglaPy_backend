const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()


const GetLearned = async(req,res)=>{
    const {userId} = req.params

    try{

        const learned =await  prisma.learned.findMany({
            where:{
                userId
            },
            include:{
              res:true
            }
        })
        res.status(200).json(learned)
    }catch(err){
        console.log(err)
        res.status(500).send('inernal server error!')
    }
}

module.exports= {GetLearned}