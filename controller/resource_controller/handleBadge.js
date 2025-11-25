const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
async function handleBadges(userId) {
    let awardedBadges = [];

    const completed = await prisma.learned.count({
        where: { userId }
    });

    const userBadges = await prisma.badge.findMany({
        where: { userId }
    });

    const hasBadge = (name) => userBadges.some(b => b.name === name);  // FIXED

    // FIRST STEP — first lesson
    if (completed >= 0 && !hasBadge("FIRST_STEP")) {
        const badge = await prisma.badge.create({
            data: {
                name: "FIRST_STEP",
                description: "Completed your first learning lesson!",
                iconUrl: "/badges/first_step.png",
                category: "learning",
                level: 1,
                userId
            }
        });
        awardedBadges.push(badge);
    }

    // LEARNING STREAK — 3 lessons
    if (completed >= 3 && !hasBadge("LEARNING_STREAK")) {
        const badge = await prisma.badge.create({
            data: {
                name: "LEARNING_STREAK",
                description: "Completed 3 lessons!",
                iconUrl: "/badges/streak.png",
                category: "learning",
                level: 2,
                userId
            }
        });
        awardedBadges.push(badge);
    }

    // AVERAGE LEARNER — 5 lessons
    if (completed >= 5 && !hasBadge("AVERAGE_LEARNER")) {
        const badge = await prisma.badge.create({
            data: {
                name: "AVERAGE_LEARNER",
                description: "Completed 5 lessons!",
                iconUrl: "/badges/average.png",
                category: "learning",
                level: 3,
                userId
            }
        });
        awardedBadges.push(badge);
    }

    // MASTER LEARNER — 10 lessons
    if (completed >= 10 && !hasBadge("MASTER_LEARNER")) {
        const badge = await prisma.badge.create({
            data: {
                name: "MASTER_LEARNER",
                description: "Completed 10 lessons!",
                iconUrl: "/badges/master.png",
                category: "learning",
                level: 4,
                userId
            }
        });
        awardedBadges.push(badge);
    }

    return awardedBadges;
}


module.exports = { handleBadges }
