import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getbadge = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  const { userId } = req.params;
  const badges = await prisma.badge.findMany({
    where: {
      userId: userId,
    },
    orderBy: { level: "desc" },
  });
  res.status(200).json(badges);
};

