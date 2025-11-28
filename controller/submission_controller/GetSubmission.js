const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const GetSubmission = async(req,res)=>{
    const {userId} = req.params
    try{

        const submission = await prisma.submission.findMany({
            where:{
                userId
            },
            include:{
                problem:true
            }
        })
        res.status(200).json(submission)
    }catch(err){
        console.log(err)
        res.status(500).send('internal server error')
    }
}
module.exports= GetSubmission