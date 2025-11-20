const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const getActivities =async (req,res)=>{
    const {userId} = req.params;
    try{
        const activities = await prisma.activity.findMany({
            where:{
                userId 
            },
        })
        return res.status(200).json(activities)
    }catch(err){
        console.log(err)
        res.status(500).send('internal server error')
    }
    
}

module.exports={getActivities}