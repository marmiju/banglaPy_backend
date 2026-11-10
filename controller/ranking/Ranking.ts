import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const ranking = async (req: Request, res: Response): Promise<void> => {
  try {
    // ===============================
    // Query Params
    // ===============================
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const search = (req.query.search as string) || "";
    const sortBy = (req.query.sortBy as string) || "score_desc";

    const minSolved = req.query.minSolved ? parseInt(req.query.minSolved as string) : undefined;
    const maxSolved = req.query.maxSolved ? parseInt(req.query.maxSolved as string) : undefined;

    const minScore = req.query.minScore ? parseInt(req.query.minScore as string) : undefined;
    const maxScore = req.query.maxScore ? parseInt(req.query.maxScore as string) : undefined;

    const skip = (page - 1) * limit;

    // ===============================
    // Sorting Logic
    // ===============================

    let orderBy: Prisma.UserScoreOrderByWithRelationInput = {};
    if (sortBy === "score_desc") orderBy = { totalScore: "desc" };
    if (sortBy === "score_asc") orderBy = { totalScore: "asc" };
    if (sortBy === "solved_desc") orderBy = { solvedCount: "desc" };
    if (sortBy === "solved_asc") orderBy = { solvedCount: "asc" };

    // ===============================
    // Filters
    // ===============================
    const filters: Prisma.UserScoreWhereInput = {
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
    const userSearch: Prisma.UserScoreWhereInput =
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

