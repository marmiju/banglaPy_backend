const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const activity = async (userId) => {
    // activity
    const today = new Date();
    const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    console.log("today", dateOnly)

    const activity = await prisma.activity.upsert({
        where: { userId_date: { userId, date: dateOnly } },
        update: { count: { increment: 1 } },
        create: { userId, date: dateOnly, count: 1 }
    });
    return activity

}
module.exports = { activity }