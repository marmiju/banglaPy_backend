const { PrismaClient } = require("@prisma/client");
const { handleBadges } = require("./handleBadge");
const { activity } = require("../activityController/Activity");
const prisma = new PrismaClient();

/*
 FLOW:
 1. Check if user already completed
 2. Store learned progress
 3. Update user score
 4. Check & award badges
*/

const LearnComplete = async (req, res) => {
    try {
        const { resId } = req.body;       // single resource ID
        const user = req.user;            // comes from auth middleware

        if (!resId) {
            return res.status(400).json({ msg: "resId is required" });
        }

        console.log("User:", user.id, "Resource:", resId);

        // activity
        const activities = await activity(user.id)


        // 1️⃣ --- CHECK IF ALREADY COMPLETED ---
        const existLearned = await prisma.learned.findFirst({
            where: { resId, userId: user.id }
        });

        if (existLearned) {
            return res.status(200).json({ msg: "Already completed" });
        }

        // 2️⃣ --- CREATE NEW LEARNED ROW ---
        const newLearn = await prisma.learned.create({
            data: {
                resId,
                userId: user.id
            }
        });

        console.log("Learned Created:", newLearn);

        // 3️⃣ --- UPDATE SCORE ---
        // Add +5 points for completing a lesson (you can change)

        const POINT = 5;

        const updatedScore = await prisma.userScore.upsert({
            where: {
                userId: user.id
            },
            update: {
                totalScore: { increment: 5 },
                solvedCount: { increment: 1 }
            },
            create: {
                userId: user.id,
                totalScore: 5,
                solvedCount: 1
            }
        });


        console.log("Score Updated:", updatedScore);

        // 4️⃣ --- BADGE SYSTEM ---
        const badges = await handleBadges(user.id);
        console.log(badges)


        return res.status(200).json({
            msg: "Learning complete",
            activities,
            lesson: newLearn,
            score: updatedScore,
            newBadges: badges
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", error });
    }
};

module.exports = { LearnComplete };
