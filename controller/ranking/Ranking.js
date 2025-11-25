const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ranking = async (req, res) => {
    try {
        // ===============================
        // Query Params
        // ===============================
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "score_desc";

        const minSolved = req.query.minSolved ? parseInt(req.query.minSolved) : undefined;
        const maxSolved = req.query.maxSolved ? parseInt(req.query.maxSolved) : undefined;

        const minScore = req.query.minScore ? parseInt(req.query.minScore) : undefined;
        const maxScore = req.query.maxScore ? parseInt(req.query.maxScore) : undefined;

        const skip = (page - 1) * limit;

        // ===============================
        // Sorting Logic
        // ===============================

        let orderBy = {};
        if (sortBy === "score_desc") orderBy = { totalScore: "desc" };
        if (sortBy === "score_asc") orderBy = { totalScore: "asc" };
        if (sortBy === "solved_desc") orderBy = { solvedCount: "desc" };
        if (sortBy === "solved_asc") orderBy = { solvedCount: "asc" };

        // ===============================
        // Filters
        // ===============================
        const filters = {
            // Solved Range Filter
            ...(minSolved !== undefined && { solvedCount: { gte: minSolved } }),
            ...(maxSolved !== undefined && { solvedCount: { lte: maxSolved } }),

            // Score Range Filter
            ...(minScore !== undefined && { totalScore: { gte: minScore } }),
            ...(maxScore !== undefined && { totalScore: { lte: maxScore } }),
        };

        // ===============================
        // Search Logic
        // ===============================
        const userSearch =
            search.trim() !== ""
                ? {
                      user: {
                          OR: [
                              { username: { contains: search, mode: "insensitive" } },
                              { email: { contains: search, mode: "insensitive" } },
                          ],
                      },
                  }
                : {};

        // ===============================
        // Fetch Paginated Ranking
        // ===============================
        const rank = await prisma.userScore.findMany({
            skip,
            take: limit,
            where: {
                ...filters,
                ...userSearch,
            },
            orderBy,
            include: {
                user: true,
            },
        });

        // ===============================
        // Count Total Items
        // ===============================
        const totalItems = await prisma.userScore.count({
            where: {
                ...filters,
                ...userSearch,
            },
        });

        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            success: true,
            msg: "Ranking fetched successfully",
            rank,
            totalItems,
            totalPages,
            currentPage: page,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};

module.exports = { ranking };
