const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
async function handleBadges(userId) {
    let awardedBadges = [];

    // total completed learning count
    const completed = await prisma.learned.count({
        where: { userId }
    });

    // get existing badge names
    const userBadges = await prisma.badge.findMany({
        where: { userId }
    });

    const hasBadge = (name) => userBadges.some(b => b.name === name);

    // 🎖 Badge 1 → First Step
    if (completed >= 1 && !hasBadge("FIRST_STEP")) {
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

    // 🎖 Badge 2 → Learning Streak (5 lessons)
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

    // 🎖 Badge 3 → Master Learner (10 lessons)
    if (completed >= 5 && !hasBadge("AVARAGE LEARNER")) {
        const badge = await prisma.badge.create({
            data: {
                name: "AVARAGE LEARNER",
                description: "Completed 5 lessons!",
                iconUrl: "/badges/master.png",
                category: "learning",
                level: 3,
                userId
            }
        });
        awardedBadges.push(badge);
    }
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
